// https://www.start.gg/tournament/testing-for-one-more-game/event/hdr
// https://www.start.gg/tournament/testing-for-one-more-game/event/pm-doubles
// https://www.start.gg/tournament/testing-for-one-more-game/event/pm-doubles-2


LoadEverything().then(() => {
  
  // 1. globals

  // TODO: write table to inner HTML
  // TODO: API key
  // const dataEvents = [
  //   { day:"sat", time:"11", name:"P+ Doubles:",       stream:"twitch" },
  //   { day:"sat", time:"11", name:"HDR Doubles:",      stream:"twitch" },
  //   { day:"sat", time:"13", name:"P+ Wave A:",        stream:"twitch" },
  //   { day:"sat", time:"13", name:"HDR Wave A:",       stream:"twitch" },
  //   { day:"sat", time:"15", name:"P+ Wave B:",        stream:"twitch" },
  //   { day:"sat", time:"15", name:"HDR Wave B:",       stream:"twitch" },

  //   { day:"sat", time:"17", name:"P+ Gold Bracket:",  stream:"twitch" },
  //   { day:"sat", time:"17", name:"HDR Gold Bracket:", stream:"twitch" },
    
  //   { day:"sat", time:"20", name:"Special Event:",    stream:"twitch" },
    
  //   { day:"sun", time:"11", name:"Melee:",            stream:"twitch" },
  //   { day:"sun", time:"11", name:"Rivals 2:",         stream:"twitch" },
  //   { day:"sun", time:"11", name:"Ultimate:",         stream:"twitch" },
  //   { day:"sun", time:"14", name:"P+ Top 8:",         stream:"twitch" },
  //   { day:"sun", time:"17", name:"HDR Top 8:",        stream:"twitch" },
  // ];


  // 2. Set, Run animations
  
  gsap.config({ nullTargetWarn: false, trialWarn: false });

  let carouselLogoAnimationHDR = gsap.timeline({ repeat: -1 });
  let logosHDR = document.querySelectorAll(".omg.hdr .carousel_logo > div");
  gsap.set(logosHDR, { autoAlpha: 0 });
  carouselLogoAnimationHDR
    .to(logosHDR[0], { autoAlpha:1, duration:0.5           })
    // .to(logosHDR[0], { autoAlpha:0, duration:0.5, delay:44 })
    .to(logosHDR[0], { autoAlpha:0, duration:0.5, delay:24 })
    .to(logosHDR[1], { autoAlpha:1, duration:0.5           })
    .to(logosHDR[1], { autoAlpha:0, duration:0.5, delay:4  })
    .to(logosHDR[2], { autoAlpha:1, duration:0.5           })
    .to(logosHDR[2], { autoAlpha:0, duration:0.5, delay:4  })
    .to(logosHDR[3], { autoAlpha:1, duration:0.5           })
    .to(logosHDR[3], { autoAlpha:0, duration:0.5, delay:4  })
    .to(logosHDR[4], { autoAlpha:1, duration:0.5           })
    .to(logosHDR[4], { autoAlpha:0, duration:0.5, delay:4  });

  let carouselLogoAnimationPPlus = gsap.timeline({ repeat: -1 });
  let logosPPlus = document.querySelectorAll(".omg.pplus .carousel_logo > div");
  gsap.set(logosPPlus, { autoAlpha: 0 });
  for (let i = 0; i < logosPPlus.length; i++) {
    carouselLogoAnimationPPlus
      .to(logosPPlus[i], { autoAlpha:1, duration:0.5           })
      .to(logosPPlus[i], { autoAlpha:0, duration:0.5, delay:19 });
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
    carouselTextAnimation.restart();
  };


  // 3. Set data
  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

    // Commentators
    if (
      Object.keys(oldData).length == 0 ||
      Object.keys(oldData.commentary).length !=
        Object.keys(data.commentary).length
    ) {
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
        if (commentator.twitter || commentator.name || commentator.real_name) {          
          $(`.commentator${index + 1}`).css("display", "");
          countFilled++;
          
          SetInnerHtml(
            $(`.commentator${index + 1} .twitter`),
            commentator.twitter
              ? `<span class="twitter_logo"></span>${String(commentator.twitter)}`
              : ""
          );

          SetInnerHtml(
            $(`.commentator${index + 1} .name`),
            `
              ${commentator.team ? `<span class="sponsor">${commentator.team}</span>` : ""}
              ${await Transcript(commentator.name)}
            `
          );

          SetInnerHtml(
            $(`.commentator${index + 1} .real_name`),
            commentator.real_name
          );
        } else {
          // $(`.commentator${index + 1}`).css("display", "none");
        }
      }
      
      if (countFilled == 0) {                           // please avert your eyes. i'm so tired
        $(".commentators._inner").html(`<div><div class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🦗</div></div>`);
      }
      else if (countFilled > 2) {
        $(`.commentary .text`).css({
          "font-size": `calc(80px / ${countFilled})`,
          "margin-bottom": `calc(8px / ${countFilled})`
        });
      }
    };

    // Everything else
    const points = [];
    points.push(document.querySelector(".p1.points"));
    points.push(document.querySelector(".p2.points"));
    
    let isTeams = Object.keys(data.score[window.scoreboardNumber].team["1"].player).length > 1;
    if (!isTeams) {
      for (const [t, team] of [
        data.score[window.scoreboardNumber].team["1"],
        data.score[window.scoreboardNumber].team["2"],
      ].entries()) {
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
                ? `<span class="twitter_logo"></span>${String(player.twitter)}`
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
            
            if (data.score[window.scoreboardNumber].first_to) {
              for (let i = 0; i < points[t].children.length; i++) {
                i < data.score[window.scoreboardNumber].first_to
                ? points[t].children[i].style.display = "block"
                : points[t].children[i].style.display = "none";
              }
            }

            for (let i = 0; i < data.score[window.scoreboardNumber].first_to; i++) {
              i < team.score
              ? points[t].children[i].classList.add("active")
              : points[t].children[i].classList.remove("active");
            }
          }
        }
        if(team.color && !tsh_settings["forceDefaultScoreColors"]) {
          document.querySelector(':root').style.setProperty(`--p${t + 1}-score-bg-color`, team.color);
        }
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
        SetInnerHtml($(`.p${t + 1} .twitter`), 
          playerNames != teamName ? playerNamesSponsored : ""
        );

        SetInnerHtml(
          $(`.p${t + 1} .pronoun`),
          ""
        );

        SetInnerHtml($(`.p${t + 1} .seed`), 
          team.player[1].seed ? `Seed ${team.player[1].seed}` : ""
        );

        if (data.score[window.scoreboardNumber].first_to) {
          for (let i = 0; i < points[t].children.length; i++) {
            i < data.score[window.scoreboardNumber].first_to
            ? points[t].children[i].style.display = "block"
            : points[t].children[i].style.display = "none";
          }
        }

        for (let i = 0; i < data.score[window.scoreboardNumber].first_to; i++) {
          i < team.score
          ? points[t].children[i].classList.add("active")
          : points[t].children[i].classList.remove("active");
        }

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
