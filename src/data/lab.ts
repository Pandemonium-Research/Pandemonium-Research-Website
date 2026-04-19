export interface PipelineItem {
  title: string;
  author: string;
  target?: string;
}

export interface ResearchPipelineData {
  idea: PipelineItem[];
  inProgress: PipelineItem[];
  submitted: PipelineItem[];
  published: PipelineItem[];
}

export const researchPipeline: ResearchPipelineData = {
  idea: [],
  inProgress: [
    {
      title: "pReAct",
      author: "Nikhil R",
      target: "Arxiv",
    },
    {
      title: "Advances in Functional Encryption: A Systematic Review",
      author: "Roshini Ramesh",
      target: "Arxiv",
    },
  ],
  submitted: [
    {
      title: "Skilldex",
      author: "Sampriti Saha & Pranav Hemanth",
      target: "Arxiv",
    },
  ],
  published: [
    {
      title: "Conversation Tree Architecture",
      author: "Pranav Hemanth & Sampriti Saha",
      target: "Arxiv",
    },
  ],
};

export interface TeamStatusEntry {
  memberId: string;
  status: string;
}

export const teamStatus: TeamStatusEntry[] = [
  { memberId: "pranav-hemanth", status: "Building with the trusty crab" },
  {
    memberId: "sampriti-saha",
    status: "Trading sleep credits for claude tokens",
  },
  { memberId: "roshini-ramesh", status: "Rusting over FeRus" },
  { memberId: "nikhil-r", status: "Trying to find free lunch" },
  { memberId: "pranavjeet-naidu", status: "Buying some (g)socs" },
  { memberId: "rahul-jaikrishna", status: "Research @ UC Berkeley" },
];
