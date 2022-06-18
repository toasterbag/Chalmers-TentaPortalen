import { Electivity } from "./clients/common";

export const parseElectivity = (s: string | undefined) => {
  switch (s) {
    case "Elective":
      return Electivity.Elective;
    case "ElectiveCompulsory":
      return Electivity.ElectiveCompulsory;
    case "Compulsory":
      return Electivity.Compulsory;
  }
  return undefined;
};
