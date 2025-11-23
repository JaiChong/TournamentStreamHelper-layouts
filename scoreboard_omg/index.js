// https://www.start.gg/tournament/testing-for-one-more-game/event/hdr
// https://www.start.gg/tournament/testing-for-one-more-game/event/pm-doubles
// https://www.start.gg/tournament/testing-for-one-more-game/event/pm-doubles-2


LoadEverything().then(() => {
  

  // 1. Set, Run animations
  
  gsap.config({ nullTargetWarn: false, trialWarn: false });

  let carouselLogoAnimationBRB = gsap.timeline({ repeat: -1 });
  let logosBRB = document.querySelectorAll(".omg.brb .carousel_logo > div");
  gsap.set(logosBRB, { autoAlpha: 0 });
  for (let i = 0; i < logosBRB.length; i++) {
    carouselLogoAnimationBRB
      .to(logosBRB[i], { autoAlpha:1, duration:0.5, delay:((i == 0) ? 25 : 0) })
      .to(logosBRB[i], { autoAlpha:0, duration:0.5, delay:4 });
  }

  let carouselLogoAnimationHDR = gsap.timeline({ repeat: -1 });
  let logosHDR = document.querySelectorAll(".omg.hdr .carousel_logo > div");
  gsap.set(logosHDR, { autoAlpha: 0 });
  for (let i = 0; i < logosHDR.length; i++) {
    carouselLogoAnimationHDR
      .to(logosHDR[i], { autoAlpha:1, duration:0.5 })
      .to(logosHDR[i], { autoAlpha:0, duration:0.5, delay:((i == 0) ? 34 : 4) });
  }

  let carouselLogoAnimationPPlus = gsap.timeline({ repeat: -1 });
  let logosPPlus = document.querySelectorAll(".omg.pplus .carousel_logo > div");
  gsap.set(logosPPlus, { autoAlpha: 0 });
  for (let i = 0; i < logosPPlus.length; i++) {
    carouselLogoAnimationPPlus
      .to(logosPPlus[i], { autoAlpha:1, duration:0.5           })
      .to(logosPPlus[i], { autoAlpha:0, duration:0.5, delay:14 });
  }
  
  let carouselTextAnimation = gsap.timeline({ repeat: -1 });
  let features = document.querySelectorAll(".carousel_text > div");
  gsap.set(features, { autoAlpha: 0 });
  for (let i = 0; i < features.length; i++) {
    carouselTextAnimation
      .to(features[i], { autoAlpha:1, duration:0.5          })
      .to(features[i], { autoAlpha:0, duration:0.5, delay:4 });
  }

  let startingAnimation = gsap
    .timeline({ paused: true })
    .from(
      [".fade"],
      {
        duration: 4,
        autoAlpha: 0,
        ease: "power2.out",
      },
      0
    )
    .from(
      [".fade_down_left_stagger:not(.text_empty)"],
      {
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: 'end',
          opacity: 0,
          y: "-20px",
        },
        duration: 0.2,
      },
      0
    )
    .from(
      [".fade_down_right_stagger:not(.text_empty)"],
      {
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: 'end',
          opacity: 0,
          y: "-20px",
        },
        duration: 0.2,
      },
      0
    )
    .from(
      [".fade_down"],
      {
        // duration: 0.2,
        // duration: 0.4,
        y: "-20px",
        ease: "power2.out",
        autoAlpha: 0,
      },
      0
    )
    .from(
      [".fade_right"],
      {
        // duration: 0.2,
        // x: "-20px",
        duration: 0.6,
        x: "-60px",
        ease: "power2.out",
        autoAlpha: 0,
      },
      0
    )
    .from(
      [".fade_left"],
      {
        // duration: 0.2,
        // x: "+20px",
        duration: 0.6,
        x: "+60px",
        ease: "power2.out",
        autoAlpha: 0,
      },
      0
    )
    .from(
      [".fade_up"],
      {
        // duration: 0.2,
        duration: 0.8,
        y: "+20px",
        ease: "power2.out",
        autoAlpha: 0,
      },
      0
    )

  Start = async () => {
    startingAnimation.restart();
    carouselLogoAnimationPPlus.restart();
    carouselLogoAnimationHDR.restart();
    carouselLogoAnimationBRB.restart();
    carouselTextAnimation.restart();
  };


  // 2. Set data
  Update = async (event) => {
    // let data = event.data;
    // let oldData = event.oldData;

    // if (
    //   Object.keys(oldData).length == 0 ||
    //   Object.keys(oldData.commentary).length !=
    //     Object.keys(data.commentary).length
    // ) ...

    // Set Commentator Data
    let html = "";
    Object.values(data.commentary).forEach((commentator, index) => {
      let namePrio = "";
      if (commentator.twitter) namePrio = `<div class="twitter"></div>`;
      else if (commentator.name) namePrio = `<div class="name"></div>`;
      else if (commentator.real_name) namePrio = `<div class="real_name"></div>`;

      html += `
        <div class="commentator${index + 1}">
          ${namePrio}
        </div>
      `;
    });
    $(".commentators._inner").html(html);

    let countFilled = 0;
    for (const [index, commentator] of Object.values(
      data.commentary
    ).entries()) {
      if (commentator) {          
        // $(`.commentator${index + 1}`).css("display", "");
        countFilled++;
        
        if (commentator.twitter) {
          SetInnerHtml(
            $(`.commentator${index + 1} .twitter`),
            commentator.twitter
              ? `<span class="icon _twitter"></span>${String(commentator.twitter)}`
              : ""
          );
        } else if (commentator.name) {
          SetInnerHtml(
            $(`.commentator${index + 1} .name`),
            `
              ${commentator.team ? `<span class="sponsor">${commentator.team}</span>` : ""}
              ${await Transcript(commentator.name)}
            `
          );
        } else if (commentator.real_name) {
          SetInnerHtml(
            $(`.commentator${index + 1} .real_name`),
            commentator.real_name
          );
        }
        else {
          $(`.comms_board .commentator${index + 1}`).html(`<div><div class="cricket">🦗</div></div>`);
          countFilled--;
        }
        
        SetInnerHtml(
          $(`.commentator${index + 1} .flagcountry`),
          commentator.country.asset
          ? `
          <div class='flag' style='background-image: url(../../${commentator.country.asset.toLowerCase()})'></div>
          <!-- <div>${commentator.country.code}</div> -->
          `
          : ""
        );
        SetInnerHtml(
          $(`.commentator${index + 1} .flagstate`),
          commentator.state.asset
          ? `
          <div class='flag' style='background-image: url(../../${commentator.state.asset})'></div>
          <!-- <div>${commentator.state.code}</div> -->
          `
          : ""
        );
        SetInnerHtml(
          $(`.commentator${index + 1} .pronoun`),
          commentator.pronoun ? commentator.pronoun : ""
        );
        console.log(commentator.pronoun);
      // } else {
      //   $(`.commentator${index + 1}`).css("display", "none");
      }
    }
    
    if (countFilled == 0) {
      $(".commentators._inner").html(`<div><div class="cricket">🦗</div></div>`);
    }
    else if (countFilled > 2) {
      $(`.commentary .text`).css({
        "font-size": `calc(80px / ${countFilled})`,
        "margin-bottom": `calc(8px / ${countFilled})`
      });
    }

    // Set Player Data
    const points = [];
    points.push(document.querySelector(".p1.points"));
    points.push(document.querySelector(".p2.points"));
    let isTeams = Object.keys(data.score[window.scoreboardNumber].team["1"].player).length > 1;
    if (!isTeams) {
      for (const [t, team] of [
        data.score[window.scoreboardNumber].team["1"],
        data.score[window.scoreboardNumber].team["2"],
      ].entries()) {
        // Set Points Data
        if (points[t]) {
          let first_to = (data.score[window.scoreboardNumber].first_to ?? 3)
          first_to = Math.min(first_to, 5);

          for (let i = 0; i < points[t].children.length; i++) {
            i < first_to
              ? points[t].children[i].style.display = "block"
              : points[t].children[i].style.display = "none";
          }

          for (let i = 0; i < data.score[window.scoreboardNumber].first_to; i++) {
            i < team.score
              ? points[t].children[i].classList.add("active")
              : points[t].children[i].classList.remove("active");
          }
        }

        for (const [p, player] of [team.player["1"]].entries()) {
          if (player) {

            SetInnerHtml(
              $(`.p${t + 1}.container .name`),
              `
                ${player.team ? `<span class="sponsor">${player.team}</span>` : ""}
                ${await Transcript(player.name)}
                ${team.losers ? "<span class='losers'>L</span>" : ""}
              `
            );

            SetInnerHtml(
              $(`.p${t + 1} .flagcountry`),
              player.country.asset
                ? `
                  <div class='flag' style='background-image: url(../../${player.country.asset.toLowerCase()})'></div>
                  <!-- <div>${player.country.code}</div> -->
                `
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .flagstate`),
              player.state.asset
                ? `
                  <div class='flag' style='background-image: url(../../${player.state.asset})'></div>
                  <!-- <div>${player.state.code}</div> -->
                `
                : ""
            );

            await CharacterDisplay(
              $(`.p${t + 1}.container .character_container`),
              {
                asset_key: "base_files/icon",
                source: `score.${window.scoreboardNumber}.team.${t + 1}`,
                scale_fill_x: true,
                scale_fill_y: true,
                custom_zoom: 1.0
              },
              event
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .avatar`),
              player.avatar
                ? `<div style="background-image: url('../../${player.avatar}')"></div>`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1}.container .online_avatar`),
              player.online_avatar
                ? `<div style="background-image: url('${player.online_avatar}')"></div>`
                : ""
            );
            
            SetInnerHtml(
              $(`.p${t + 1} .twitter`),
              player.twitter
                ? `<span class="icon _twitter"></span>${String(player.twitter)}`
                : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .pronoun`),
              player.pronoun ? player.pronoun : ""
            );

            SetInnerHtml(
              $(`.p${t + 1} .seed`),
              player.seed ? `Seed ${player.seed}` : ""
            );

          }
        }

        // if(team.color && !tsh_settings["forceDefaultScoreColors"]) {
        //   document.querySelector(':root').style.setProperty(`--p${t + 1}-score-bg-color`, team.color);
        // }
      }
    } else {
      for (const [t, team] of [
        data.score[window.scoreboardNumber].team["1"],
        data.score[window.scoreboardNumber].team["2"],
      ].entries()) {
        let teamName = team.teamName;

        let names = [];
        let namesSponsored = [];
        for (const [p, player] of Object.values(team.player).entries()) {
          if (player && player.name) {
            names.push(await Transcript(player.name));
            namesSponsored.push(`
              ${player.team ? `<span class="sponsor">${player.team}</span>` : ""}
              ${await Transcript(player.name)}
            `);
          }
        }
        let playerNames = names.join(" / ");
        let playerNamesRev = names.reverse().join(" / ");
        let playerNamesSponsored = namesSponsored.join(`
          <span class="doubles_divider">/</span>
        `);
        
        if (
          !team.teamName
          || team.teamName == ""
          || team.teamName == playerNames
          || team.teamName == playerNamesRev
        ) {
          teamName = playerNamesSponsored;
        }

        SetInnerHtml(
          $(`.p${t + 1}.container .name`),
          `
            ${teamName}
            ${team.losers ? "<span class='losers'>L</span>" : ""}
          `
        );

        await CharacterDisplay(
          $(`.p${t + 1}.container .character_container`),
          {
            asset_key: "base_files/icon",
            source: `score.${window.scoreboardNumber}.team.${t + 1}`,
            slice_character: [0, 1],
            scale_fill_x: true,
            scale_fill_y: true,
            custom_zoom: 1.0
          },
          event
        );

        // NOTE: repurposed inexplicitly
        SetInnerHtml(
          $(`.p${t + 1} .twitter`), 
          playerNamesSponsored != teamName ? playerNamesSponsored : ""
        );

        SetInnerHtml(
          $(`.p${t + 1} .pronoun`), "");

        SetInnerHtml(
          $(`.p${t + 1} .seed`), 
          team.player[1].seed ? `Seed ${team.player[1].seed}` : ""
        );

        if(team.color) {
          document.querySelector(':root').style.setProperty(`--p${t + 1}-score-bg-color`, team.color);
        }
      }
    }

    SetInnerHtml($(".match"), data.score[window.scoreboardNumber].match);

    let phaseTexts = [];
    if (data.score[window.scoreboardNumber].phase) phaseTexts.push(data.score[window.scoreboardNumber].phase);
    // if (data.score[window.scoreboardNumber].best_of_text) phaseTexts.push(data.score[window.scoreboardNumber].best_of_text);

    SetInnerHtml($(".phase"), phaseTexts.join(" - "));
  };
});
