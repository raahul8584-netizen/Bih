export default function NewsBanner() {
  const news = [
    { 
      title: "Logistic Hub expands its fully electric delivery fleet", 
      author: "Hub Press Center", 
      comments: 0,
      image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      title: "New Logistic Hub opens, creating 1,000+ local jobs", 
      author: "Hub Press Center", 
      comments: 0,
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    },
    { 
      title: "Innovations in robotics inside Logistic Hub facilities", 
      author: "Hub Press Center", 
      comments: 0,
      image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
    }
  ];

  return (
    <div className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '36px', color: 'var(--secondary)' }}>Latest from Logistic Hub</h2>
        </div>
        <div className="mobile-grid-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
          {news.map((item, idx) => (
            <div key={idx} className="card-hover" style={{ 
              backgroundColor: 'var(--white)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '1px solid #D5D9D9',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
            }}>
              <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="icon-spin" // Reusing animation class for subtle zoom/effect
                />
              </div>
              <div style={{ padding: '25px' }}>
                <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: 'var(--text-light)', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>PRESS CENTER</span>
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', lineHeight: 1.4, color: 'var(--primary)', fontWeight: 600 }}>{item.title}</h3>
                <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>
                  Read the story <span style={{ fontSize: '18px' }}>›</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
