import { Course, Programme } from "@app/prisma/clients/common";

type StudentBoard = {
  division: string;
  email: string;
  programmes: Array<string>;
};

export const studentBoards = [
  {
    division: "D",
    email: ["dns", "@dtek.se"],
    programmes: ["TKDAT", "MPALG", "MPCSN", "MPHPC"],
  },
  {
    division: "IT",
    email: ["snit", "@chalmers.it"],
    programmes: ["TKITE", "MPSOF", "MPIDE", "MPDSC"],
  },
  {
    division: "Æ",
    email: ["snae", "@aetek.chalmers.se"],
    programmes: ["TAFFS"],
  },
  {
    division: "F",
    email: ["snf", "@ftek.se"],
    programmes: ["TKTEM", "TKTFY", "MPCAS", "MPENM", "MPPHS", "MPNAT"],
  },
  {
    division: "TD",
    email: ["sntd", "@tdtek.chalmers.se"],
    programmes: ["TKDES", "MPDES"],
  },
  {
    division: "E",
    email: ["sne", "@elektroteknolog.se"],
    programmes: ["TKELT", "TKMED", "MPBME", "MPEPO", "MPEES"],
  },
  {
    division: "KfKb",
    email: ["sn", "@kfkb.se"],
    programmes: ["TKBIO", "TKKEF", "MPBIO"],
  },
  {
    division: "Sjö",
    email: ["utb", "@sjosektionen.se"],
    programmes: ["SBVII", "TSJKL", "TSILO", "TISJL", "MPMAR"],
  },
  {
    division: "A",
    email: ["auu", "@atek.chalmers.se"],
    programmes: ["TKARK"],
  },
  {
    division: "AT",
    email: ["atu", "@atek.chalmers.se"],
    programmes: ["TKATK"],
  },
  {
    division: "V",
    email: ["snv", "@vtek.chalmers.se"],
    programmes: ["TKSAM", "TISAM", "MPDCM", "MPSOV", "MPIEE"],
  },
  {
    division: "M",
    email: ["muu", "@mtek.chalmers.se"],
    programmes: ["TKMAS", "MPMOB", "MPAME", "MPAEM"],
  },
  {
    division: "H",
    email: ["utb", "@htek.chalmers.se"],
    programmes: ["TIDAL", "TIELL", "TIDSL", "TIMEL", "TIMAL", "TIEPL"],
  },
  {
    division: "K",
    email: ["kuu", "@kemisektionen.com"],
    programmes: ["TIKEL", "TKKMT", "MPMCN"],
  },
  {
    division: "I",
    email: ["sni", "@itek.chalmers.se"],
    programmes: ["TKIEK", "MPMEI", "MPQOM", "MPSCM", "MPBDP"],
  },
  {
    division: "GS",
    email: ["utbildningsansvarig", "@globalasystem.se"],
    programmes: ["TKGBS"],
  },
  {
    division: "Z",
    email: ["snz", "@ztek.se"],
    programmes: ["TKAUT", "MPSYS"],
  },
  {
    division: "Basår",
    email: ["samo", "@tbkchalmers.se"],
    programmes: ["ZBASS"],
  },
];

export const studentBoardByProgramme = new Map(
  studentBoards.flatMap((board) => board.programmes.map((p) => [p, board])),
).map((p, board) => ({ ...board, email: board.email.join("") }));

export type WithStudentBoard = { studentBoard: StudentBoard | undefined };

export const withStudentBoard = <T extends Course | Programme>(
  item: T,
): T & WithStudentBoard => {
  if ("owner_code" in item)
    return {
      ...item,
      studentBoard: studentBoardByProgramme.get(item.owner_code),
    };
  return { ...item, studentBoard: studentBoardByProgramme.get(item.code) };
};

/*
utbildning@mtek.chalmers.se
*/

/*
???
MPISC
MPPDE
FRIST
MPLOL

MPPEN
MPSEB
MPSES
MPTSE
MPWPS
MPARC
MPDSD
---



*/
