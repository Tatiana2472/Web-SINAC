import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { MissionVision } from "./pages/MissionVision";
import { Transparency } from "./pages/Transparency";
import { History } from "./pages/History";
import { SchedulesRates } from "./pages/SchedulesRates";
import { ConservationAreas } from "./pages/ConservationAreas";
import { ConservationAreaDetail } from "./pages/ConservationAreaDetail";
import { NationalParks } from "./pages/NationalParks";
import { InstitutionalProcedures } from "./pages/InstitutionalProcedures";
import { OnlineServices } from "./pages/OnlineServices";
import { ContactUs } from "./pages/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/mision-vision",
    Component: MissionVision,
  },
  {
    path: "/transparencia",
    Component: Transparency,
  },
  {
    path: "/historia",
    Component: History,
  },
  {
    path: "/horarios-tarifas",
    Component: SchedulesRates,
  },
  {
    path: "/areas-conservacion",
    Component: ConservationAreas,
  },
  {
    path: "/area-conservacion/:slug",
    Component: ConservationAreaDetail,
  },
  {
    path: "/parques-nacionales",
    Component: NationalParks,
  },
  {
    path: "/tramites-institucionales",
    Component: InstitutionalProcedures,
  },
  {
    path: "/servicios-linea",
    Component: OnlineServices,
  },
  {
    path: "/contactenos",
    Component: ContactUs,
  }
]);
