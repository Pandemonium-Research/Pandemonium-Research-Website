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
    // affiliations: { incoming: "IITM", prev: ["IIITH", "IITK"] },
    affiliations: { current: ["IITM"], prev: ["IIITH", "IITK"] },
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
    // affiliations: { incoming: "IITM", prev: ["IIITH", "IITK"] },
    affiliations: { current: ["IITM"], prev: ["IIITH", "IITK"] },
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
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/roshini_bw?_a=BAMAOGcc0",
    // quote: ""
    // affiliations: { incoming: "IISc", prev: ["IISc"] },
    affiliations: { current: ["IISc"], prev: ["ISFCR"] },
    links: {
      github: "https://github.com/roshr22",
      linkedin: "https://www.linkedin.com/in/roshiniramesh/",
      website: "https://roshiniramesh.vercel.app/",
    },
  },
  {
    id: "nikhil-r",
    name: "Nikhil R",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Nikhil_bw?_a=BAMAOGcc0",
    // quote: ""
    affiliations: { current: ["Intuit"], prev: ["IITB"] },
    links: {
      github: "https://github.com/nikhilr612",
      linkedin: "https://www.linkedin.com/in/nikhil-r-0375732b5/",
    },
  },
  {
    id: "pranavjeet-naidu",
    name: "Pranavjeet Naidu",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Jeet_bw?_a=BAMAOGcc0",
    // quote: ""
    affiliations: { current: ["The Linux Foundation", "TwoSpoon"], prev: ["PIL"] },
    links: {
      github: "https://github.com/Pranavjeet-Naidu",
      linkedin: "https://www.linkedin.com/in/pranavjeet-naidu-464882282/",
      website: "https://pranavjeet.me",
    },
  },
  {
    id: "rahul-jaikrishna",
    name: "Rahul Jaikrishna",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Rahul_bw?_a=BAMAOGcc0",
    // quote: ""
    affiliations: { current: ["UC Berkeley"] },
    links: {
      github: "https://github.com/Tensorflow-Ranger",
      linkedin: "https://www.linkedin.com/in/rahul-jaikrishna-64971a1a7/",
    },
  },
  {
    id: "prakhyath-p-nayak",
    name: "Prakhyath P Nayak",
    role: "Researcher",
    imageUrl:
      "https://res.cloudinary.com/dkldnxuae/image/upload/c_limit,f_auto,q_auto,w_400/v1/pandemonium/people/Prakyath_P_Naiyak_bw?_a=BAMAOGiu0",
    // quote: ""
    affiliations: { current: ["SKaaS"], prev: ["CIE"] },
    links: {
      github: "https://github.com/PrakyathPNayak",
      linkedin: "https://www.linkedin.com/in/prakyath-p-nayak/",
    },
  },
];
