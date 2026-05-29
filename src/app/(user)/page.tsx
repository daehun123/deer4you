import React from "react";
import HomeHeader from "./(home)/_components/HomeHeader";
import ArtistSection from "./(home)/_components/ArtistSection";
import EventSection from "./(home)/_components/EventSection";
import LostAndFoundSection from "./(home)/_components/LostAndFoundSection";
import MainBanner from "./(home)/_components/MainBanner";
import NoticeTicker from "./(home)/_components/NoticeTicker";
import NoticeModal from "./(home)/_components/NoticeModal";
import GoodsBanner from "./(home)/_components/GoodsBanner";
import Credit from "./(home)/_components/Credit";

export default function Page() {
  return (
    <div className="pb-16">
      <NoticeModal />
      <HomeHeader />
      <MainBanner />
      <NoticeTicker />
      <ArtistSection />
      <EventSection />
      <GoodsBanner />
      <LostAndFoundSection />
      <Credit />
    </div>
  );
}
