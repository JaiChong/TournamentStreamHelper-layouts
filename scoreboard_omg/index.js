// TOC:
// 0. Build via ../*.jsx
//    `LoadEverything().then(() =>` {
//       1. Set, Run animations
//          let startingAnimation = ...
//          `Start = async() => {...};`
//       2. Set data
//          `Update = async(event) =>` {
//            2.1 Set doubles|singles
//            2.2 Set player data
//            2.3 Set tournament data
//          };
//    })

// TODOs:
// 1.
//  - explore why a ".doubles .info" anim removal causes default scoreboard to flicker
// 2.2
//  - if (player.state.asset) {remove player.state.country}
//  - remove twitter handles
//  - explore sponsor container
//  - explore custom team colors

LoadEverything().then(() => {
  gsap.config({ nullTargetWarn: false, trialWarn: false });

  // 1. Set, Run animations
  // TODO: explore animations

  // fade+slide:
  //  .from(
  //    [".class"],
  //    { duration: 1, opacity: "0", x: "+40px", ease: "power2.inOut" },
  //    0
  //  )

  // unroll:
  //    ".class",
  //    { width: 0, duration: 1, ease: "power2.inOut" },
  //    0
  //  )

  let startingAnimation = gsap
    .timeline({ paused: true })
    .from(
      [".container"],
      { duration: 1, opacity: "0", y: "-10px", ease: "power2.inOut" },
      0
    )
    .from(
      [".logo"],
      { duration: 1, opacity: "0", y: "+10px", ease: "power2.inOut" },
      0
    )
    // shifts .flagcountry and .flagstate right for some reason
    // .from(
    //   [".personal"],
    //   { duration: 1, opacity: "0", x: "+20px", y: "+10px", ease: "power2.inOut" },
    //   0
    // )
    .from(
      ".mask",
      { width: 0, duration: 1, ease: "power2.inOut" }, 0)
    // TODO: explore why removing this causes default scoreboard to flicker
    .from(
      ".doubles .info",
      { opacity: 0, duration: 0.5, ease: "power2.inOut" },
      0.8
    );

  Start = async () => {
    startingAnimation.restart();
  };

  // 2. Set data
  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

    let isTeams = Object.keys(data.score[window.scoreboardNumber].team["1"].player).length > 1;

    // 2.1 Set doubles|singles
    // if (scores num per team changes) {transition between doubles->singles and v.v.}
    if (
      oldData.score == null ||
      Object.keys(oldData.score[window.scoreboardNumber].team["1"].player).length !=
        Object.keys(data.score[window.scoreboardNumber].team["1"].player).length
    ) {
      if (Object.keys(data.score[window.scoreboardNumber].team["1"].player).length == 1) {
        gsap
          .timeline()
          .fromTo(
            ["body > .doubles"],
            { duration: 0.2, opacity: "1", ease: "power2.inOut" },
            { duration: 0.2, opacity: "0", ease: "power2.inOut" }
          )
          .fromTo(
            ["body > .singles"],
            { duration: 0.2, opacity: "0", ease: "power2.inOut" },
            { duration: 0.2, opacity: "1", ease: "power2.inOut" }
          );
      } else {
        gsap
          .timeline()
          .fromTo(
            ["body > .singles"],
            { duration: 0.2, opacity: "1", ease: "power2.inOut" },
            { duration: 0.2, opacity: "0", ease: "power2.inOut" }
          )
          .fromTo(
            ["body > .doubles"],
            { duration: 0.2, opacity: "0", ease: "power2.inOut" },
            { duration: 0.2, opacity: "1", ease: "power2.inOut" }
          );
      }
    }

    // 2.2 Set player data
    // for (each data.score[...].team)
    for (const [t, team] of [
      data.score[window.scoreboardNumber].team["1"],
      data.score[window.scoreboardNumber].team["2"],
    ].entries()) {
      let teamName = "";

      // Set team.teamName
      if (!team.teamName || team.teamName == "") {
        let names = [];
        for (const [p, player] of Object.values(team.player).entries()) {
          if (player) {
            names.push(await Transcript(player.name));
          }
        }
        teamName = names.join(" / ");
      } else {
        teamName = team.teamName;
      }

      // Set team.losers [L] for GF
      SetInnerHtml(
        $(`.info.doubles.t${t + 1} .team_name`),
        `
          ${teamName}${team.losers ? " [L]" : ""}
        `
      );

      // for (each team.player)
      for (const [p, player] of Object.values(team.player).entries()) {
        if (player) {
          // Set player.team sponsor, player.name, team.losers [L] for GF
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .name`),
            `
                <span>
                    <span class='sponsor'>
                        ${player.team ? player.team + "" : ""}
                    </span>
                    ${await Transcript(player.name)}
										${team.losers && !isTeams ? " [L]" : ""}
                </span>
            `
          );

          // Set player.pronoun
          SetInnerHtml($(`.t${t + 1}.p${p + 1} .pronoun`), player.pronoun);

          // Set player.country.asset's .flagname and .flag
          // TODO: if (player.state.asset) {remove player.state.country}
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .flagcountry`),
            player.country.asset
            ? `
            <div class='flagname'>${player.country.code}</div>
            <div class='flag' style="background-image: url('../../${player.country.asset.toLowerCase()}')"></div>
            `
            : ""
          );
          
          // Set player.state.asset's div.flagname and div.flag
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .flagstate`),
            player.state.asset
              ? `
                <div class='flagname'>${player.state.code}</div>
                <div class='flag' style="background-image: url('../../${player.state.asset}')"></div>
              `
              : ""
          );

          // Set player.twitter
          // TODO: remove twitter handles
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .twitter`),
            player.twitter
              ? `<span class="twitter_logo"></span>${String(player.twitter)}`
              : ""
          );

          // Set team.score for singles
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .score`),
            !isTeams ? String(team.score) : ""
          );

          // Set team.score for doubles
          SetInnerHtml($(`.t${t + 1} .doubles_score`), String(team.score));

          // Set div.sponsor-container's div.sponsor-logo as player.sponsor_logo
          // TODO: explore sponsor container
          SetInnerHtml(
            $(`.t${t + 1}.p${p + 1} .sponsor-container`),
            `<div class='sponsor-logo' style="background-image: url('../../${player.sponsor_logo}')"></div>`
          );
        }
        // Set custom team colors
        // TODO: explore custom team colors
        if(team.color && !tsh_settings["forceDefaultScoreColors"]) {
          document.querySelector(':root').style.setProperty(`--p${t + 1}-score-bg-color`, team.color);
        }
      }
    }

    // 2.3 Set tournament data

    let phaseTexts = [];
    if (data.score[window.scoreboardNumber].phase) phaseTexts.push(data.score[window.scoreboardNumber].phase);
    // if (data.score[window.scoreboardNumber].best_of_text) phaseTexts.push(data.score[window.scoreboardNumber].best_of_text);

    SetInnerHtml($(".info.material_container .phase"), phaseTexts.join(" - "));
    SetInnerHtml(
      $(".info.material_container .tournament_name"),
      data.tournamentInfo.tournamentName
    );
    SetInnerHtml($(".info.material_container .match"), data.score[window.scoreboardNumber].match);
  };
});
