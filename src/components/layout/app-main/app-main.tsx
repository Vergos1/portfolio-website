"use client";

import {
  AboutSection,
  ContactSection,
  HeroSection,
} from "@/components/layout/sections";
import React, { Fragment } from "react";

export function AppMain() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <ContactSection />
    </Fragment>
  );
}
