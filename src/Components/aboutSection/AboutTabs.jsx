import React, { useEffect, useMemo, useState } from "react";

import CompanyProfile from "../../Pages/CompanyProfile";
import EssentiaManifesto from "./EssentiaManifesto";
import MeetFounders from "./MeetFounders";
import CoreTeam from "./CoreTeam";
import TeamImgSection from "./TeamImgSection";
import FaqSection from "./FaqSection";

function getTabFromUrl() {
  try {
    const url = new URL(window.location.href);
    const tab = url.searchParams.get("tab");
    return tab || null;
  } catch {
    return null;
  }
}

function setTabToUrl(tabKey) {
  const url = new URL(window.location.href);
  url.searchParams.set("tab", tabKey);
  window.history.replaceState({}, "", url.pathname + url.search + url.hash);
}

export default function AboutTabs() {
  const initialTab = useMemo(() => {
    return getTabFromUrl() || null;
  }, []);

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const onPopState = () => {
      setActiveTab(getTabFromUrl() || null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isCompanyProfile = activeTab === "company_profile";

  return (
    <>
      {/* About page ka existing content unchanged rahega.
          Sirf jab company profile tab query param se open hoga tabhi animated PDF page render hoga. */}
      {isCompanyProfile ? (
        <CompanyProfile />
      ) : (
        <>
          <EssentiaManifesto />
          <MeetFounders />
          <CoreTeam />
          <TeamImgSection />
          <FaqSection />
        </>
      )}
    </>
  );
}


