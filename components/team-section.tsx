import React from "react";
import { AnimatedDetails } from "./ui/team-details";
type Detail = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
const TeamSection = () => {
  const team: Detail[] = [
    {
      name: "Hardik Sharma - D25092",
      src: "/ph.jpeg",
      designation: "Backend Enginner",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quasi laboriosam, mollitia, minima optio praesentium adipisci in quis fuga ducimus esse fugit. Dolores, qui eveniet voluptate dolorem fugit doloribus placeat!",
    },
    {
      name: "Aashish Negi - DD25011",
      src: "/person1.png",
      designation: "AI Enginner",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quasi laboriosam, mollitia, minima optio praesentium adipisci in quis fuga ducimus esse fugit. Dolores, qui eveniet voluptate dolorem fugit doloribus placeat!",
    },
    {
      name: "Sushant Sharma - S25064",
      src: "/sui.jpg",
      designation: "Backbone of UIT",
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quasi laboriosam, mollitia, minima optio praesentium adipisci in quis fuga ducimus esse fugit. Dolores, qui eveniet voluptate dolorem fugit doloribus placeat!",
    },
  ];
  return (
    <section
      id="team"
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-24 text-center"
    >
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
        Meet the Team
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
        <span className="font-semibold">konAIchiwa</span> — a group of
        innovators redefining the intersection of AI and creativity.
      </p>

      <div className="flex-1 w-full h-full">
        <AnimatedDetails Details={team} autoplay={true} />
      </div>
    </section>
  );
};

export default TeamSection;
