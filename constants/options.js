export const optionsArr = [
    {
      id: "identity",
      label: "Identity Display",
      defaultValue: "showName",
      options: [
        { key: "Show Name", value: "showName" },
        { key: "Anonymous", value: "anonymous" },
      ],
      info: "Choose whether users’ names will be shown with their answers or kept anonymous. Showing names helps build trust, recognition, and accountability. Allowing anonymity, on the other hand, can make users feel more comfortable, encouraging honest and open responses, especially for sensitive or personal questions.",
      pageType: "input",
    },
    {
      id: "visibility",
      label: "Answer Visibility",
      defaultValue: "instantReveal",
      options: [
        { key: "All Hands", value: "allHands" },
        { key: "Instant Reveal", value: "instantReveal" },
      ],
      info: "Decide when answers should become visible to everyone. With instant reveal, all users can see others’ answers as soon as they are submitted. With reveal after everyone answers, no answers are visible until every user has submitted their response. This helps avoid any influence between participants and ensures that each answer is independent and unbiased.",
      pageType: "input",
    },
    {
      id: "timing",
      label: "Response Timing",
      defaultValue: "nonTimed",
      options: [
        { key: "Timed", value: "timed" },
        { key: "Non-Timed", value: "nonTimed" },
      ],
      info: "Choose whether to set a time limit for answering. A timed poll adds urgency by giving users only a limited window to respond, encouraging quicker thinking and faster participation. A non-timed poll allows users to take their time and answer at their own pace, which can lead to more thoughtful and detailed responses.",
      pageType: "input",
    },
    {
      id: "shareBy",
      label: "Share By",
      defaultValue: "friends",
      options: [
        { key: "Adding Friends", value: "friends" },
        { key: "Creating Public Link", value: "public" },
      ],
      info: "Choose whether to allow users to submit their answers anonymously. Anonymity can encourage more honest and open responses, especially for sensitive or personal questions. Non-anonymous responses can help build trust and accountability, as users know their names will be associated with their answers.",
      pageType: "preview",
    }
  ];
  