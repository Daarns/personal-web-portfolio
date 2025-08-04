"use client";
import ProfileCard from "../../app/components/ProfileCard/ProfileCard";
import {motion, useAnimation} from "framer-motion";
import {useRef, useEffect} from "react";
import {useInView} from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, {once: true, margin: "-100px"});
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-foreground">
          About <span className="text-primary">Me</span>
        </h2>
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {opacity: 0, y: 40},
            visible: {
              opacity: 1,
              y: 0,
              transition: {duration: 0.7, ease: "easeOut"},
            },
          }}
        >
          {/* Kiri: Profile Card */}
          <div className="flex justify-center">
            <ProfileCard
              name="M Nandana Aruna A B"
              title="Web Developer"
              handle="Daarns"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/assets/ProfileCard/nandanas.png"
              iconUrl="/assets/ProfileCard/daarns.png"
              grainUrl={undefined} // or provide grain texture URL
              behindGradient={null} // use default
              innerGradient={null} // use default
              showBehindGradient={true}
              className=""
              miniAvatarUrl="/assets/ProfileCard/nandanas.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              mobileTiltSensitivity={5}
              onContactClick={() =>
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=nandana219@gmail.com",
                  "_blank"
                )
              }
            />
          </div>
          {/* Kanan: Konten Background */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Background
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I am a graduate of Associate Degree in Information Technology with
              a focus on backend development and REST APIs. I have experience
              building REST APIs using Spring Boot and Java, as well as web
              scraping with FastAPI and Gemini AI integration. In addition, I am
              proficient in PHP frameworks such as CodeIgniter and Laravel, and
              have hands-on experience in application hosting during my
              internship. I am open to new challenges in the technology world
              and have a strong interest in learning AI in the future.
            </p>
            <h3 className="text-2xl font-semibold mb-6 text-foreground mt-10">
              Education & Experience
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-6">
                <h4 className="font-semibold text-foreground">
                  Senior Highschool
                </h4>
                <p className="text-muted-foreground">SMA Negeri 9 Malang</p>
                <p className="text-muted-foreground">2018-2021</p>
              </div>
              <div className="border-l-4 border-success pl-6">
                <h4 className="font-semibold text-foreground">College</h4>
                <p className="text-muted-foreground">Brawijaya University</p>
                <p className="text-muted-foreground">2022-2025</p>
                <p className="text-muted-foreground">
                  Associate Degree in Information Technology
                </p>
                <p className="text-muted-foreground">GPA 3.81/4.00</p>
              </div>
              <div className="border-l-4 border-accent-foreground pl-6">
                <h4 className="font-semibold text-foreground">
                  Internship Experience
                </h4>
                <p className="text-muted-foreground">
                  CV. Digital Idea Solutions (DIGIS)
                </p>
                <p className="text-muted-foreground">
                  September 2024 - February 2025
                </p>
                <p className="text-muted-foreground">
                  Web Development, Deploy & Hosting
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
