'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiShield, FiMessageCircle, FiPlus, FiSend, FiClock, FiInfo, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { getCustomerQueries, createCustomerQuery, updateCustomerQuery, updateProfile, getSupportInfo } from '@/lib/strapi';

interface UserData {
  email?: string;
}

interface ProfileData {
  id?: string | number;
  documentId?: string | number;
  Name?: string;
  Phone?: string;
  Adhar?: string;
  Pan?: string;
  GSTIN?: string;
}

interface SettingsProps {
  user: UserData;
  profile: ProfileData;
  refreshData: () => void;
}

interface SupportComment {
  query?: string;
  managerReply?: string;
  userSeen?: boolean;
  userSeenAt?: string;
}

interface CustomerQuery {
  id: string | number;
  documentId?: string | number;
  email?: string;
  Title?: string;
  description?: string;
  comments?: SupportComment[];
  active?: boolean;
  createdAt?: string;
  attributes?: {
    email?: string;
    Title?: string;
    description?: string;
    comments?: SupportComment[];
    active?: boolean;
    createdAt?: string;
  };
}

interface SupportData {
  supportmail?: string;
  supportnumber?: string;
  supportwhatapp?: string;
}

const getQueryKey = (query: CustomerQuery | null) => {
  if (!query) return "";
  return String(query.documentId || query.id);
};

export default function Settings({ user, profile, refreshData }: SettingsProps) {
  const [queries, setQueries] = useState<CustomerQuery[]>([]);
  const [selectedQuery, setSelectedQuery] = useState<CustomerQuery | null>(null);
  const [supportData, setSupportData] = useState<SupportData | null>(null);

  // New Query States
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuery, setNewQuery] = useState('');

  // Profile Edit States
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(profile?.Phone || '');

  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const fetchQueries = async () => {
    if (!user?.email) return;
    const token = localStorage.getItem('token');
    if (token) {
      const data = await getCustomerQueries(token, user.email);
      setQueries(data);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadSettingsData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      if (user?.email) {
        const customerQueries = await getCustomerQueries(token, user.email);
        if (isMounted) setQueries(customerQueries);
      }

      const supportInfo = await getSupportInfo(token);
      if (isMounted) setSupportData(supportInfo?.attributes || supportInfo);
    };

    loadSettingsData();

    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  useEffect(() => {
    if (!user?.email) return;

    let isMounted = true;

    const refreshSupportQueries = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const latestQueries: CustomerQuery[] = await getCustomerQueries(token, user.email!);
      if (!isMounted) return;

      setQueries(latestQueries);

      const selectedKey = getQueryKey(selectedQuery);
      if (!selectedKey) return;

      const latestSelectedQuery = latestQueries.find((query) => getQueryKey(query) === selectedKey);
      if (latestSelectedQuery) {
        setSelectedQuery(latestSelectedQuery);
      }
    };

    const intervalId = window.setInterval(refreshSupportQueries, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [selectedQuery, user?.email]);

  const handleUpdatePhone = async () => {
    const token = localStorage.getItem('token');
    const docId = profile.documentId || profile.id;
    if (token && docId) {
      setLoading(true);
      await updateProfile(token, String(docId), { Phone: tempPhone });
      setIsEditingPhone(false);
      refreshData();
      setLoading(false);
    }
  };

  const handleCreateQuery = async () => {
    if (!newTitle.trim() || !newDescription.trim() || !newQuery.trim()) return;
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      await createCustomerQuery(token, {
        email: user.email,
        Title: newTitle,
        description: newDescription,
        comments: [{ query: newQuery, managerReply: "", userSeen: false, userSeenAt: "" }]
      });
      // Reset
      setNewTitle('');
      setNewDescription('');
      setNewQuery('');
      setShowNewModal(false);
      fetchQueries();
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim() || !selectedQuery) return;
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      const data = selectedQuery.attributes || selectedQuery;
      const existingComments = data.comments || [];
      const newComments = [...existingComments, { query: reply, managerReply: "", userSeen: false, userSeenAt: "" }];

      const docId = selectedQuery.documentId || selectedQuery.id;
      await updateCustomerQuery(token, String(docId), newComments);

      setReply('');
      // Update local state
      const updatedQuery = { ...selectedQuery };
      if (updatedQuery.attributes) {
        updatedQuery.attributes.comments = newComments;
      } else {
        updatedQuery.comments = newComments;
      }
      setSelectedQuery(updatedQuery);
      fetchQueries();
      setLoading(false);
    }
  };

  useEffect(() => {
    const markManagerRepliesAsSeen = async () => {
      if (!selectedQuery) return;

      const token = localStorage.getItem('token');
      if (!token) return;

      const data = selectedQuery.attributes || selectedQuery;
      const existingComments: SupportComment[] = data.comments || [];
      const hasUnseenManagerReply = existingComments.some((chat) => chat.managerReply && chat.userSeen !== true);

      if (!hasUnseenManagerReply) return;

      const seenAt = new Date().toISOString();
      const updatedComments = existingComments.map((chat) =>
        chat.managerReply && chat.userSeen !== true
          ? { ...chat, userSeen: true, userSeenAt: seenAt }
          : chat
      );
      const docId = selectedQuery.documentId || selectedQuery.id;

      await updateCustomerQuery(token, String(docId), updatedComments);

      const updatedQuery = { ...selectedQuery };
      if (updatedQuery.attributes) {
        updatedQuery.attributes.comments = updatedComments;
      } else {
        updatedQuery.comments = updatedComments;
      }

      setSelectedQuery(updatedQuery);
      setQueries((prevQueries) =>
        prevQueries.map((query) => (query.id === selectedQuery.id ? updatedQuery : query))
      );
    };

    markManagerRepliesAsSeen();
  }, [selectedQuery]);

  const maskValue = (value: string | undefined | null, visibleCount: number = 2) => {
    if (!value) return 'Not Provided';
    const visible = value.slice(-visibleCount);
    const masked = '*'.repeat(Math.max(0, value.length - visibleCount));
    return masked + visible;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full pb-[50px]">
      <div className="mb-[30px]">
        <h1 className="text-[26px] font-bold mb-[5px]">Account Settings</h1>
        <p className="text-[#565959] m-0">Manage your profile details and support queries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {/* Left Column: Profile & Support Info */}
        <div className="flex flex-col gap-[30px]">
          <div className="bg-white rounded-[12px] shadow-sm border border-[#eee] overflow-hidden">
            <div className="p-[15px] bg-[#f8f9fa] border-b border-[#eee] flex items-center gap-[10px]">
              <FiUser className="text-[#FF9900]" />
              <h3 className="m-0 font-bold text-[15px]">Business Profile</h3>
            </div>
            <div className="p-[20px] grid grid-cols-1 gap-[20px]">
              <InfoItem label="Full Name" value={profile?.Name} icon={<FiUser />} />
              <InfoItem label="Email Address" value={user?.email} icon={<FiMail />} />
              <div className="flex flex-col gap-[4px] relative">
                <label className="text-[11px] font-bold text-[#888] uppercase tracking-[0.5px]">Phone Number</label>
                <div className="flex items-center gap-[8px] text-[14px] font-medium text-[#131921]">
                  <span className="text-[#aaa]"><FiPhone /></span>
                  {isEditingPhone ? (
                    <div className="flex items-center gap-[5px] flex-1">
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        className="flex-1 border border-[#FF9900] rounded-[4px] px-[8px] py-[4px] text-[14px] outline-none"
                        autoFocus
                      />
                      <button onClick={handleUpdatePhone} disabled={loading} className="p-[6px] bg-[#2ecc71] text-white rounded-[4px] border-none cursor-pointer">
                        <FiSave size={14} />
                      </button>
                      <button onClick={() => setIsEditingPhone(false)} className="p-[6px] bg-[#e74c3c] text-white rounded-[4px] border-none cursor-pointer">
                        <FiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-1 group">
                      <span>{profile?.Phone || 'Not Provided'}</span>
                      <button
                        onClick={() => {
                          setTempPhone(profile?.Phone || '');
                          setIsEditingPhone(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-[4px] text-[#FF9900] hover:bg-[#fff7ed] rounded transition-all cursor-pointer border-none bg-transparent"
                        title="Edit Phone"
                      >
                        <FiEdit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <InfoItem label="Aadhar Number" value={maskValue(profile?.Adhar, 4)} icon={<FiLock />} isMasked />
              <InfoItem label="PAN Card" value={maskValue(profile?.Pan, 3)} icon={<FiShield />} isMasked />
              <InfoItem label="GSTIN Number" value={maskValue(profile?.GSTIN, 3)} icon={<FiLock />} isMasked />
            </div>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm border border-[#eee] overflow-hidden">
            <div className="p-[15px] bg-[#f8f9fa] border-b border-[#eee] flex items-center gap-[10px]">
              <FiMessageCircle className="text-[#FF9900]" />
              <h3 className="m-0 font-bold text-[15px]">Support Helpline</h3>
            </div>
            <div className="p-[20px]">
              <div className="flex flex-col gap-[12px]">
                <a href={`mailto:${supportData?.supportmail}`} className="flex items-center gap-[10px] p-[10px] rounded-[8px] bg-[#f0f7ff] border border-[#d1e6ff] no-underline">
                  <FiMail className="text-[#0066cc]" />
                  <span className="text-[13px] font-bold text-[#0066cc]">{supportData?.supportmail}</span>
                </a>
                <a href={`https://wa.me/${supportData?.supportwhatapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[10px] p-[10px] rounded-[8px] bg-[#f0fff4] border border-[#d1ffd9] no-underline">
                  <FiMessageCircle className="text-[#25d366]" />
                  <span className="text-[13px] font-bold text-[#25d366]">WhatsApp: {supportData?.supportwhatapp}</span>
                </a>
                <div className="flex items-center gap-[10px] p-[10px] rounded-[8px] bg-[#fff9f0] border border-[#ffe8cc]">
                  <FiPhone className="text-[#f39c12]" />
                  <span className="text-[13px] font-bold text-[#f39c12]">Call: {supportData?.supportnumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm border border-[#eee] overflow-hidden">
            <div className="p-[15px] bg-[#f8f9fa] border-b border-[#eee] flex items-center gap-[10px]">
              <FiShield className="text-[#FF9900]" />
              <h3 className="m-0 font-bold text-[15px]">Security & Password</h3>
            </div>
            <div className="p-[20px]">
              <div className="bg-[#fff9eb] border border-[#ffe8cc] rounded-[10px] p-[15px] flex gap-[12px]">
                <FiInfo className="text-[#856404] shrink-0 mt-[2px]" size={18} />
                <div className="flex flex-col gap-[5px]">
                  <p className="m-0 text-[13px] font-bold text-[#856404]">Important Login Notice</p>
                  <p className="m-0 text-[12px] text-[#856404] leading-[1.6]">
                    Please ensure you securely store your login email and password. Self-service password recovery is currently unavailable.
                    If you lose access, you will need to contact your <strong>Relationship Manager</strong> to reset your credentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Support Tickets & Chat */}
        <div className="bg-white rounded-[12px] shadow-sm border border-[#eee] overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-[15px] bg-[#f8f9fa] border-b border-[#eee] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <FiMessageCircle className="text-[#FF9900]" />
              <h3 className="m-0 font-bold text-[15px]">Support Tickets</h3>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-[#FF9900] text-white border-none px-[12px] py-[6px] rounded-[6px] text-[12px] font-bold cursor-pointer flex items-center gap-[5px]"
            >
              <FiPlus /> New Query
            </button>
          </div>

          {!selectedQuery ? (
            <div className="flex-1 overflow-y-auto p-[15px]">
              {queries.length === 0 ? (
                <div className="text-center py-[50px]">
                  <FiMessageCircle size={40} className="text-[#eee] mx-auto mb-[10px]" />
                  <p className="text-[#888] text-[14px]">No active queries found.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-[10px]">
                  {queries.map((q) => {
                    const data = q.attributes || q;
                    const isActive = data.active !== false;
                    return (
                      <div
                        key={q.id}
                        onClick={() => setSelectedQuery(q)}
                        className={`p-[15px] rounded-[10px] border cursor-pointer transition-all ${isActive ? 'border-[#eee] hover:border-[#FF9900] bg-white' : 'border-[#eee] bg-[#f9f9f9] opacity-70'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-[5px]">
                          <span className="font-bold text-[14px]">{data.Title || 'No Title'}</span>
                          <span className={`text-[10px] px-[6px] py-[2px] rounded-full font-bold uppercase ${isActive ? 'bg-[#fff7ed] text-[#f39c12]' : 'bg-[#eee] text-[#888]'
                            }`}>
                            {isActive ? 'Active' : 'Closed'}
                          </span>
                        </div>
                        <p className="text-[12px] text-[#565959] line-clamp-1 m-0">{data.description || 'No Description'}</p>
                        <div className="mt-[8px] flex items-center gap-[5px] text-[10px] text-[#aaa]">
                          <FiClock /> {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {(() => {
                const data = selectedQuery.attributes || selectedQuery;
                const isActive = data.active !== false;
                return (
                  <>
                    <div className="p-[10px] border-b border-[#eee] flex items-center gap-[10px] bg-white">
                      <button onClick={() => setSelectedQuery(null)} className="bg-transparent border-none text-[12px] text-[#FF9900] font-bold cursor-pointer hover:underline">
                        &larr; Back
                      </button>
                      <span className="font-bold text-[13px] truncate">{data.Title || 'Support Ticket'}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-[15px] flex flex-col gap-[15px] bg-[#f8f9fa]">
                      {/* Ticket Summary Section */}
                      <div className="bg-white p-[15px] rounded-[10px] border border-[#eee] shadow-sm">
                        <div className="flex flex-col gap-3">
                          <div>
                            <h4 className="m-0 mb-1 text-[11px] font-bold text-[#FF9900] uppercase tracking-wider">Subject Title</h4>
                            <p className="m-0 text-[15px] font-bold text-[#131921]">{data.Title}</p>
                          </div>
                          <div className="pt-2 border-t border-[#f5f5f5]">
                            <h4 className="m-0 mb-1 text-[11px] font-bold text-[#FF9900] uppercase tracking-wider">Description</h4>
                            <p className="m-0 text-[14px] text-[#565959] leading-[1.6] whitespace-pre-wrap">{data.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-[10px] my-[5px]">
                        <div className="flex-1 h-[1px] bg-[#eee]"></div>
                        <span className="text-[10px] font-bold text-[#aaa] uppercase tracking-[1px]">Messages</span>
                        <div className="flex-1 h-[1px] bg-[#eee]"></div>
                      </div>

                      {/* Chat Messages */}
                      {((data.comments || []) as SupportComment[]).map((chat, idx: number) => (
                        <div key={idx} className="flex flex-col gap-[8px]">
                          <div className="self-end max-w-[85%]">
                            <div className="bg-[#232F3E] text-white p-[12px] rounded-[15px] rounded-tr-[2px] text-[13px] shadow-sm">
                              {chat.query}
                            </div>
                          </div>
                          {chat.managerReply && (
                            <div className="self-start max-w-[85%]">
                              <div className="bg-white text-[#131921] p-[12px] rounded-[15px] rounded-tl-[2px] text-[13px] shadow-sm border border-[#eee]">
                                <p className="m-0 font-bold text-[10px] text-[#FF9900] mb-[4px]">Support Manager</p>
                                {chat.managerReply}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {isActive ? (
                      <div className="p-[15px] bg-white border-t border-[#eee]">
                        <div className="flex gap-[10px]">
                          <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border border-[#ddd] rounded-[8px] px-[12px] py-[10px] text-[13px] outline-none focus:border-[#FF9900]"
                            onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                          />
                          <button
                            onClick={handleReply}
                            disabled={loading || !reply.trim()}
                            className="bg-[#FF9900] text-white border-none w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer disabled:bg-gray-300"
                          >
                            <FiSend />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-[12px] bg-[#fef2f2] text-[#b91c1c] text-[11px] font-bold text-center border-t border-[#fee2e2]">
                        <FiInfo className="inline-block mr-1 align-middle" /> This ticket is closed.
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* New Query Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[12px] p-[25px] animate-in zoom-in-95 duration-200">
            <h3 className="m-0 mb-[20px] font-bold">New Support Query</h3>

            <div className="flex flex-col gap-[15px] mb-[25px]">
              <div>
                <label className="text-[11px] font-bold text-[#888] uppercase mb-[5px] block">Query Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Shipment Issue"
                  className="w-full border border-[#ddd] rounded-[8px] px-[12px] py-[10px] text-[14px] outline-none focus:border-[#FF9900]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#888] uppercase mb-[5px] block">Problem Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Explain the background of the issue..."
                  className="w-full h-[80px] border border-[#ddd] rounded-[8px] p-[12px] text-[14px] outline-none focus:border-[#FF9900] resize-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#888] uppercase mb-[5px] block">Initial Message / Query</label>
                <textarea
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  placeholder="What is your specific question?"
                  className="w-full h-[80px] border border-[#ddd] rounded-[8px] p-[12px] text-[14px] outline-none focus:border-[#FF9900] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-[10px]">
              <button
                onClick={handleCreateQuery}
                disabled={loading || !newTitle.trim() || !newDescription.trim() || !newQuery.trim()}
                className="flex-1 bg-[#FF9900] text-white border-none py-[12px] rounded-[10px] font-bold cursor-pointer disabled:bg-gray-300 transition-colors"
              >
                {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
              <button
                onClick={() => {
                  setShowNewModal(false);
                  setNewTitle('');
                  setNewDescription('');
                  setNewQuery('');
                }}
                className="flex-1 bg-white border border-[#ddd] text-gray-600 py-[12px] rounded-[10px] font-bold cursor-pointer hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value, icon, isMasked }: { label: string; value?: string; icon: ReactNode; isMasked?: boolean }) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-[11px] font-bold text-[#888] uppercase tracking-[0.5px]">{label}</label>
      <div className="flex items-center gap-[8px] text-[14px] font-medium text-[#131921]">
        <span className="text-[#aaa]">{icon}</span>
        <span className={isMasked ? 'tracking-[1px]' : ''}>{value || 'N/A'}</span>
      </div>
    </div>
  );
}
