import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import FeaturesCard from '../../components/features-card/FeaturesCard';
import HeroSection from '../../components/herosection/HeroSection';



const Home = () => {
  const features = [
    {
      id: 1,
      title: 'Organize Memories',
      description: 'Sort and organize your photos with custom tags and collections.',
      icon: '📁'
    },
    {
      id: 2,
      title: 'Journal Entries',
      description: 'Attach stories and notes to your photos to preserve every detail.',
      icon: '📝'
    },
    {
      id: 3,
      title: 'AI Compilations',
      description: 'Let our AI create beautiful compilations based on your memories.',
      icon: '✨'
    }
  ];

  return (
    <div className={styles.homePage}>
      <HeroSection 
        title="Preserve Your Summer Memories"
        subtitle="Organize, journal, and relive your most precious moments"
        ctaText="Explore Gallery"
        ctaLink="/gallery"
      />
      
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <p className={styles.sectionSubtitle}>Everything you need to cherish your memories</p>
        </div>
        
        <div className={styles.featuresGrid}>
          {features.map(feature => (
            <FeaturesCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>
      
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to start organizing?</h2>
          <p className={styles.ctaText}>
            Upload your photos, add details, and create beautiful memory collections.
          </p>
          <Link to="/gallery" className={styles.ctaButton}>
            Go to Gallery
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;