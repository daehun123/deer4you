import React from "react";
import SectionLayout from "./SectionLayout";
import ArtistCard from "./ArtistCard";
import { lineupItems, scheduleDays } from "../../schedule/_data/scheduleData";

const dateLabelByDate = Object.fromEntries(
  scheduleDays.map((day) => [day.date, day.label.replace("/", ".")]),
);

export default function ArtistSection() {
  return (
    <SectionLayout title="대동제 출연 아티스트" link="/schedule">
      {lineupItems.map((artist) =>
        artist.imageUrlHome ? (
          <ArtistCard
            key={artist.id}
            name={artist.title}
            imageUrl={artist.imageUrlHome}
            date={dateLabelByDate[artist.date] ?? artist.date}
          />
        ) : null,
      )}
    </SectionLayout>
  );
}
