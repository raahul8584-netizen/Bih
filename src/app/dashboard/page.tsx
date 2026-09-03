'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, getUserData } from '@/lib/strapi';
import ProfileForm from '@/components/ProfileForm';
import Sidebar from '@/components/dashboard/Sidebar';
import Navbar from '@/components/dashboard/Navbar';
import Overview from '@/components/dashboard/Overview';
import Process from '@/components/dashboard/Process';
import Settings from '@/components/dashboard/Settings';
import InvoiceModal from '@/components/dashboard/InvoiceModal';
import NotificationBanner from '@/components/dashboard/NotificationBanner';
import LogoLoader from '@/components/UI/logoloder/Logoloder';
import { FiBox } from 'react-icons/fi';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  // Data State
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [addProcesses, setAddProcesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const userData = await getMe(token);
      setUser(userData);

      if (userData.email) {
        const [extraData, addProcData] = await Promise.all([
          getUserData(token, userData.email),
          import('@/lib/strapi').then(m => m.getAddProcesses(token, userData.email))
        ]);
        
        const profileInfo = extraData.profile?.attributes || extraData.profile;
        setProfile(profileInfo);
        setProcesses(extraData.processes);
        setAddProcesses(addProcData);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab) {
        setActiveTab(tab);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleDownloadInvoice = (step: any) => {
    setSelectedInvoice(step);
    setShowInvoice(true);
  };

  const closeInvoice = () => {
    setShowInvoice(false);
    setSelectedInvoice(null);
  };

  if (!mounted || loading) return <LogoLoader forceShow={true} />;

  if (!profile) {
    return <ProfileForm user={user} onSuccess={() => {
      setLoading(true);
      fetchData();
    }} />;
  }

  return (
    <div className="flex min-h-screen bg-[#f4f7f6] text-[#131921]">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        processes={processes}
      />

      <main className="flex-1 ml-[260px] flex flex-col">
        <Navbar user={user} profile={profile} />

        <div className="p-[30px] flex-1">
          {/* Action Notifications */}
          <NotificationBanner addProcesses={addProcesses} />

          {activeTab === 'overview' ? (
            <Overview setActiveTab={setActiveTab} profile={profile} processes={processes} />
          ) : activeTab === 'process' ? (
            <Process handleDownloadInvoice={handleDownloadInvoice} processes={processes} profile={profile} />
          ) : activeTab === 'settings' ? (
            <Settings user={user} profile={profile} refreshData={fetchData} />
          ) : (
            <div className="py-[100px] text-center">
              <FiBox size={60} className="text-[#ddd] mx-auto" />
              <h2 className="text-[#232F3E] mt-[20px] text-xl font-bold" style={{ color: '#232F3E' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view coming soon...
              </h2>
            </div>
          )}
        </div>
      </main>

      <InvoiceModal 
        show={showInvoice} 
        onClose={closeInvoice} 
        invoice={selectedInvoice} 
        user={user} 
        profile={profile} 
      />
    </div>
  );
}
