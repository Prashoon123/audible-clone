import React from "react";
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import Image from "next/image";
import Head from "next/head";
import Header from "components/Header";
import { motion } from "framer-motion";
import Pulse from "react-reveal/Pulse";
import useDarkMode from "hooks/useDarkMode";

export default function SignIn({ providers }) {
  const [colorTheme] = useDarkMode();

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="container"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="item" variants={item}>
        <div className="h-screen bg-white dark:bg-gray-900">
          <Head>
            <title>Audible Sign in</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="icon.jpg" />
          </Head>

          <Header />
          <Pulse>
            <div className="w-80 h-[70vh] mx-auto grid place-items-center bg-gray-100 dark:bg-gray-800 mt-5 rounded-lg item">
              {colorTheme === "dark" ? (
                <Image
                  width={140}
                  height={54}
                  className="cursor-pointer"
                  objectFit="contain"
                  src="https://m.media-amazon.com/images/G/31/audibleweb/arya/navigation/audible_logo._CB490888215_.svg"
                  alt="logo"
                />
              ) : (
                <Image
                  width={140}
                  height={54}
                  objectFit="contain"
                  src="https://res.cloudinary.com/dssvrf9oz/image/upload/v1626081418/782-7825680_audible-logo-graphic-design-hd-png-download-removebg-preview_ljltcm.png"
                  alt="logo"
                />
              )}
              <div>
                <div>
                  {Object.values(providers).map((provider) => {
                    return (
                      <div key={provider.name}>
                        <button
                          className="button"
                          onClick={() => signIn(provider.id)}
                        >
                          Sign in with {provider.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Pulse>
        </div>
      </motion.div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}
