'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/frontend/components/critical/AnnouncementBar';
import { Header } from '@/frontend/components/critical/Header';
import { Hero } from '@/frontend/components/critical/Hero';
import { RoutineFinderSection } from '@/frontend/components/catalog/RoutineFinderSection';
import { BestsellersSection } from '@/frontend/components/catalog/BestsellersSection';
import { BundleKitsSection } from '@/frontend/components/catalog/BundleKitsSection';
import { ConcernsSection } from '@/frontend/components/catalog/ConcernsSection';
import { ScienceAuthoritySection } from '@/frontend/components/catalog/ScienceAuthoritySection';
import { TextureSpotlightSection } from '@/frontend/components/catalog/TextureSpotlightSection';
import { FaqSection } from '@/frontend/components/catalog/FaqSection';
import { Footer } from '@/frontend/components/critical/Footer';

export function StorefrontView() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <>
      <AnnouncementBar />
      <Header
        onSelectCategory={setSelectedCategory}
        activeCategory={selectedCategory}
      />
      <main id="storefrontHomeView">
        <Hero />
        <RoutineFinderSection />
        <BestsellersSection initialCategory={selectedCategory} key={selectedCategory} />
        <BundleKitsSection />
        <ConcernsSection onSelectCategory={setSelectedCategory} />
        <ScienceAuthoritySection />
        <TextureSpotlightSection onSelectCategory={setSelectedCategory} />
        <FaqSection />
      </main>
      <Footer onSelectCategory={setSelectedCategory} />
    </>
  );
}

