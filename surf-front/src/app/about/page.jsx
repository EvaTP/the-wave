import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-center mt-20 mb-10">About Us</h1>
      </div>

      <div className="flex flex-col mb-6 items-center">
        <Image
          className="rounded-[50%] object-cover border-2 border-cyan-700"
          src="/pointbreak.jpg.webp"
          alt="The founders"
          width={250}
          height={250}
          priority
        />
      </div>

      <div className="min-h-screen flex flex-col py-2 px-4">
        <h4 className="text-4xl text-center">
          Surfing is more than just a sport,<br></br>it's a way of life.
        </h4>
        <p className="text-2xl mt-4 px-6 py-4">
          Founded in 1991 by two passionate surfers, <strong>Johnny </strong>{" "}
          and <strong>Bodhi</strong>,{" "}
          <em>
            <strong>The Wave </strong>
          </em>
          was born to create a place where surfers from around the world could
          share their experiences and discover the best spots to ride.
          <br></br> <br></br>
          The name
          <em>
            <strong> The Wave </strong>
          </em>
          is a tribute to the endless search for that perfect swell – the kind
          of wave that pushes surfers to travel across continents, explore new
          horizons, and connect with others who share the same passion.
          <br></br> <br></br>
          Learning to surf is a long and demanding process, both physically and
          mentally. It takes time, patience, and resilience before one can truly
          feel at ease among the waves. At
          <em>
            <strong> The Wave</strong>
          </em>
          , we encourage perseverance: progress may be slow, but every wipeout
          brings you closer to that moment of pure joy when you finally ride
          with confidence.
          <br></br> <br></br>
          Above all, The Wave is built on the <strong>values </strong> of the
          surfing community: love and respect for nature, respect for others and
          for oneself, listening to your body, and knowing when to stop to
          prevent injuries. Surfing reminds us that every ride is a lesson in
          humility and courage.
          <br></br>
          <br></br>
          Our goal is not only to help you find waves but also to inspire a
          mindful approach to surfing, one that celebrates the ocean and the
          people who share it.
          <br></br>
        </p>
        <br></br>
        {/* Bouton */}
        <ButtonLink
          href="home"
          className="my-4 text-md px-3 py-1 rounded bg-blue-900 text-white"
        >
          🏄‍♂️ Back to Homepage
        </ButtonLink>
      </div>
    </>
  );
}
