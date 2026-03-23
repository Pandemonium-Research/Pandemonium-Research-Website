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
  },
  {
    id: "pranav-hemanth",
    name: "Pranav Hemanth",
    role: "Co-founder & Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Pranav_Hemanth_bw?_a=BAMAOGcc0",
    quote: "Rome wasn't built in a day because they didn't have Claude Code."
  },
  {
    id: "roshini-ramesh",
    name: "Roshini Ramesh",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Roshini_Ramesh_bw?_a=BAMAOGcc0",
    // quote: ""
  },
];
