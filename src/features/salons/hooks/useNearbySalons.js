//-------------------------Important File As it fetch the Real Data(No Fall Back data)//-------------------------

// "use client";

// import { useEffect, useState } from "react";
// import { fetchNearbySalons } from "../services/salonService";
// import { useUserLocation } from "./useUserLocation";

// export const useNearbySalons = () => {
//   const { location, error: locationError } = useUserLocation();
//   const [salons, setSalons] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!location) return;

//     async function loadSalons() {
//       try {
//         const data = await fetchNearbySalons(
//           location.latitude,
//           location.longitude,
//           20
//         );
//         setSalons(data);
//       } catch (err) {
//         setError("Failed to fetch salons");
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadSalons();
//   }, [location]);

//   return { salons, loading, error: error || locationError };
// };


//-------------------------Important File As it fetch the Real Data(With Fall Back data)//-------------------------
"use client";

import { useEffect, useState } from "react";
import { fetchNearbySalons } from "../services/salonService";
import { useUserLocation } from "./useUserLocation";
import { salons as fallbackSalons } from "../data/salons";

export const useNearbySalons = () => {
  const { location, error: locationError } = useUserLocation();

  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    async function loadSalons() {
      try {
        if (!location) {
          throw new Error("No location");
        }

        const data = await fetchNearbySalons(
          location.latitude,
          location.longitude,
          20
        );

        if (!data || data.length === 0) {
          throw new Error("Empty data");
        }

        setSalons(data);
      } catch (err) {
        setSalons(fallbackSalons);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadSalons();
  }, [location]);

  return { salons, loading, isFallback };
};