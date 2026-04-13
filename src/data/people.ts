import { Person } from "@/lib/types";

/**
 * Team member data.
 * Images hosted on Cloudinary — run `npm run upload:people` to refresh URLs.
 */
export const people: Person[] = [
  {
    id: "sampriti-saha",
    name: "Sampriti Saha",
    role: "Co-founder & Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Sampriti_Saha_bw?_a=BAMAOGcc0",
    // quote: ""
    links: {
      github: "https://github.com/Sampriti2803",
      linkedin: "https://www.linkedin.com/in/sampriti-saha/",
      website: "https://sampriti-saha.vercel.app/",
    },
  },
  {
    id: "pranav-hemanth",
    name: "Pranav Hemanth",
    role: "Co-founder & Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Pranav_Hemanth_bw?_a=BAMAOGcc0",
    quote: "Rome wasn't built in a day because they didn't have Claude Code.",
    links: {
      github: "https://github.com/Pranavh-2004",
      linkedin: "https://www.linkedin.com/in/pranav-hemanth/",
      website: "https://pranav-hemanth.vercel.app",
    },
  },
  {
    id: "roshini-ramesh",
    name: "Roshini Ramesh",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Roshini_Ramesh_bw?_a=BAMAOGcc0",
    // quote: ""
    links: {
      github: "https://github.com/roshr22",
      linkedin: "https://www.linkedin.com/in/roshiniramesh/",
      website: "https://roshiniramesh.vercel.app/",
    },
  },
];
