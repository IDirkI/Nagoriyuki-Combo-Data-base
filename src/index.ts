let combos = {
  data: [
    /*  Combo Card Template
     *   Title: Name of the combo
     *
     *
     *
     *
     *
     *
     */
    {
      title: "Conversion from 5P",
      category: ["any", "blood-rage-setup"],
      notation: `5P > 6P > 623H > OTG 6H > (236K)`,
      netBlood: "+32.4",
      difficulty: `Very Easy`,
      description: `Simple conversion from <span style='color:var(--p)'>5P</span>. Useful when mashing or catching the opponent trying to press a button on your approach.`,
      video:
        "https://www.dustloop.com/wiki/images/a/aa/GGST_Nagoriyuki_Double_Special_Combo.mp4",
    },
    {
      title: "Conversion from 5K",
      category: ["any"],
      notation: `5K > (6K) > 623H > OTG 6H > (236K)`,
      netBlood: "+32.4",
      difficulty: "Very Easy",
      description: `Useful follow up after poking with <span style='color:var(--k)'>5K</span>. Note that <span style='color:var(--k)'>6K</span> will not connect if you are too far so skip <span style='color:var(--k)'>6K</span> when at max <span style='color:var(--k)'>5K</span> range.`,
      video: "",
    },
    {
      title: "Essential Blood Reduction",
      category: ["any"],
      notation: `f.SSS`,
      netBlood: "-129.6",
      difficulty: "Very Easy",
      description: `Last hit of <span style='color:var(--s)'>f.SSS</span> will greatly reduce blood making <span style='color:var(--s)'>f.SSS</span> a relatively low risk option when high on blood.`,
      video: "",
    },
    {
      title: "Evasive and Agressive Round Start",
      category: ["round-start"],
      notation: `214K~6 > (CH) f.SS > 236H > OTG 2S > (236K)`,
      netBlood: "+111.6",
      difficulty: "Easy",
      description: `Great round start for opponents who like to throw out big risky moves on round start. Keep in mind the first hit of <span style='color:var(--s)'>f.SS</span> 
                        will lose or trade with active moves like [] and <span style='color:var(--k)'>214K</span> will lose to very fast and big moves like Sol's <span style='color:var(--h)'>6H</span>. Against an opponent who likes to
                        safe jump at round start your <span style='color:var(--s)'>f.SS</span> will be very punishable so this isn't a very safe round start.`,
      video: "",
    },
    {
      title: "Corner c.S BnB",
      category: ["corner", "wall-break"],
      notation: `(CH) c.S > f.SS > 214H > 623H > c.S > 6H WS > 6H WB `,
      netBlood: "+64.8",
      difficulty: "Easy",
      description: `Low input wallbreak combo from a <span style='color:var(--s)'>c.S</span> in the corner. A strike/throw on an opponent on wakeup is an easy way to get a <span style='color:var(--s)'>c.S</span>.`,
      video: "",
    },
    {
      title: "Bite follow up",
      category: ["any", "wall-break"],
      notation: `623P > RRC~c.S > 623H > 236K > c.S > f.SSS (WS) > ( 6H WB )`,
      netBlood: "+64.8",
      difficulty: "Medium",
      description: `Low input wallbreak combo from a <span style='color:var(--s)'>c.S</span> in the corner. A strike/throw on an opponent on wakeup is an easy way to get a <span style='color:var(--s)'>c.S</span>.`,
      video: "",
    },
  ],
};

// FIXME: Fix for RC cancels breaks down if there is more than one cancel. Move most coloring into a seperate function and implement fix with recursion possibly(?)

/// Coloring the Moves from Text and Color Correction
// Notation Colorer
for (let i of combos.data) {
  for (let j of i.notation.split(" ")) {
    // Jump to next j value if "WS" or "(CH)" come up as they'll be left white
    if (j == "WS" || j == "(CH)" || j == "~") continue;

    let arr: string[] = i.notation.split(" ");
    let move: string = j;

    // Variables for fixing bracket and RC cancel notation problems
    let newNotation: string;
    let rightBracket: string = "";
    let leftBracket: string = "";

    let preRC: string = "";
    let postRC: string = "";
    let RCColor: string = "";
    let RCMovement: string = "";

    // Use r/l bracket variables to dynamically fix the placement of brackets in some moves
    if (j.includes("(") && j.includes(")")) {
      move = move.slice(1, move.length - 1);
      rightBracket = "(";
      leftBracket = ")";
    }

    // Use pre/post RC along with RCcolor to dynamically fix the problem where RCC and the move proceeding it would need to be colord differently as they would not have a
    // space but a ~ between them.
    if (j.includes("RC~")) {
      preRC = j.slice(0, j.indexOf("~") + 1);
      postRC = j.slice(j.indexOf("~") + 1);

      //Fix preRC issue when RC calcel is preceeded by dash input (66, 44, 88, 22)
      if (preRC.length != 4) {
        preRC = j.slice(2, j.indexOf("~") + 1);
        RCMovement = j.slice(0, 2);
      }

      move = postRC;

      RCColor = `${RCMovement}<span style='color:var(--${preRC
        .slice(0, preRC.length - 1)
        .toLocaleLowerCase()})'>${preRC}</span>`;
    }

    // Replace plain text with HTML color style, if move includes brackets, they will automatically be placed because of the r/l bracket variables
    if (j.includes("P") && !j.includes("PRC"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}${RCColor}<span style='color:var(--p)'>${move}</span>${leftBracket}`;
    else if (j.includes("K"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}${RCColor}<span style='color:var(--k)'>${move}</span>${leftBracket}`;
    else if (j.includes("S"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}${RCColor}<span style='color:var(--s)'>${move}</span>${leftBracket}`;
    else if (j.includes("H"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}${RCColor}<span style='color:var(--h)'>${move}</span>${leftBracket}`;
    else if (j.includes("D"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}${RCColor}<span style='color:var(--d)'>${move}</span>${leftBracket}`;
    else if (j.includes("RRC"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}<span style='color:var(--rrc)'>${move}</span>${leftBracket}`;
    else if (j.includes("BRC"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}<span style='color:var(--brc)'>${move}</span>${leftBracket}`;
    else if (j.includes("YRC"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}<span style='color:var(--yrc)'>${move}</span>${leftBracket}`;
    else if (j.includes("PRC"))
      arr[
        arr.indexOf(j)
      ] = `${rightBracket}<span style='color:var(--prc)'>${move}</span>${leftBracket}`;

    // Reset bracket and RC variables for next iteration
    rightBracket = "";
    leftBracket = "";

    preRC = "";
    postRC = "";
    RCColor = "";
    RCMovement = "";

    // Construct newNotation from the array of moves
    newNotation = arr.join(" ");

    // Replace the notation entry of the combo object
    i.notation = newNotation;
  }
}

// Color corrector [~ , dl.]
for (let i of combos.data) {
  // Split between RC~ and ~ is to fix the problem with multi coloring of the same move
  if (i.notation.includes("RC~")) {
    i.notation = i.notation.replaceAll(
      "~",
      `</span><span style='color:white'>~`
    );
  } else {
    i.notation = i.notation.replaceAll(
      "~",
      `<span style='color:white'>~</span>`
    );
  }
  i.notation = i.notation.replaceAll(",", `<span style='color:white'>,</span>`);
  i.notation = i.notation.replaceAll(
    "dl.",
    `<span style='color:white'>dl.</span>`
  );
}

// Difficulty Colorer
for (let i of combos.data) {
  if (i.difficulty == "Very Easy")
    i.difficulty = `<span style='color:var(--very-easy)'>Very Easy</span>`;
  if (i.difficulty == "Easy")
    i.difficulty = `<span style='color:var(--easy)'>Easy</span>`;
  if (i.difficulty == "Medium")
    i.difficulty = `<span style='color:var(--medium)'>Medium</span>`;
  if (i.difficulty == "Hard")
    i.difficulty = `<span style='color:var(--hard)'>Hard</span>`;
  if (i.difficulty == "Very Hard")
    i.difficulty = `<span style='color:var(--very-hard)'>Very Hard</span>`;
}

// HTML Div Creation
for (let i of combos.data) {
  // Create Card
  let card = document.createElement("div");
  // Create Tag
  card.classList.add("card");
  for (let j of i.category) {
    card.classList.add(j);
  }
  card.classList.add("hideTag");

  // Container
  let container = document.createElement("div");
  container.classList.add("container");

  // Top Contailer (Title + Difficulty)
  let topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  container.appendChild(topContainer);

  // Combo Title
  let title = document.createElement("h2");
  title.classList.add("combo-title");
  title.innerText = i.title;
  topContainer.appendChild(title);

  // Combo Difficulty
  let diff = document.createElement("h2");
  diff.classList.add("combo-difficulty");
  diff.innerHTML = i.difficulty;
  topContainer.appendChild(diff);

  // Combo Notation
  let notation = document.createElement("h4");
  notation.classList.add("combo-notation");
  notation.innerHTML = i.notation;
  container.appendChild(notation);

  // Mid Contailer (Description + Video)
  let midContainer = document.createElement("div");
  midContainer.classList.add("mid-container");
  container.appendChild(midContainer);

  // Combo Descriptiton
  let desc = document.createElement("h4");
  desc.classList.add("combo-description");
  desc.innerHTML = i.description;
  midContainer.appendChild(desc);

  // FIXME: Local videos don't play and videos from yourtube have youtube integration. Remove youtube integration or find a better method to reference videos.
  // Video Container
  let videoContainer = document.createElement("iframe");
  videoContainer.setAttribute("width", "348px");
  videoContainer.setAttribute("height", "216px");
  videoContainer.setAttribute("max-width", "100%");
  videoContainer.setAttribute("max-height", "100%");
  videoContainer.setAttribute("pre-load", "none");
  videoContainer.setAttribute("controls", "");
  videoContainer.setAttribute("src", i.video);
  midContainer.appendChild(videoContainer);

  // Combo Blood
  let netBlood = document.createElement("h5");
  netBlood.classList.add("combo-netBlood");
  netBlood.innerHTML = `Net Blood Gain: <span class='blood' style='color:var(--blood)'>${i.netBlood}</span>`;
  container.appendChild(netBlood);

  card.appendChild(container);
  document.getElementById("combos")?.appendChild(card);
}
