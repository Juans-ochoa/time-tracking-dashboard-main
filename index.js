const d = document,
  $work = d.getElementById("work"),
  $play = d.getElementById("play"),
  $study = d.getElementById("study"),
  $exercise = d.getElementById("exercise"),
  $social = d.getElementById("social"),
  $selfCare = d.getElementById("self_care"),
  $linkDaily = d.getElementById("daily_link"),
  $linkWeekly = d.getElementById("weekly_link"),
  $linkMonthly = d.getElementById("monthly_link");

let $taskDayly, $taskWeekly, $taskMonthly;

function addTimeTask(title, previous, current) {
  return `
			<div class="task__body ${title} ${title !== "weekly" && `hidden__task`}">
				<div class="task__time">${current}hrs</div>
				<p class="task__description">Last ${
          title === "weekly" ? "Week" : title === "dayly" ? "Day" : "Month"
        } - ${previous}hrs</p>
			</div>
		`;
}

function addHtmlTask(title, timeframes) {
  return `
		<article class="task">
		<header class="task__header">
			<p>${title}</p>
			<button class="menu__task">
				<img src="/images/icon-ellipsis.svg" alt="icon-ellipsis" />
			</button>
		</header>
		${
      timeframes.daily &&
      addTimeTask(
        "dayly",
        timeframes.daily.previous,
        timeframes.daily.current,
        false
      )
    }
		${
      timeframes.monthly &&
      addTimeTask(
        "monthly",

        timeframes.monthly.previous,
        timeframes.monthly.current,
        false
      )
    }
		${
      timeframes.weekly &&
      addTimeTask(
        "weekly",
        timeframes.weekly.previous,
        timeframes.weekly.current,
        true
      )
    }
	</article>
		`;
}

function getData() {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((el) => {
        let { title, timeframes } = el;

        switch (title.toLowerCase()) {
          case "work":
            $work.innerHTML = addHtmlTask(title, timeframes);
            break;
          case "play":
            $play.innerHTML = addHtmlTask(title, timeframes);
            break;
          case "study":
            $study.innerHTML = addHtmlTask(title, timeframes);
            break;
          case "exercise":
            $exercise.innerHTML = addHtmlTask(title, timeframes);
            break;
          case "social":
            $social.innerHTML = addHtmlTask(title, timeframes);
            break;
          default:
            $selfCare.innerHTML = addHtmlTask(title, timeframes);
            break;
        }
      });
    });
}

function changeTask(tasks, show = false) {
  tasks.forEach((el) => {
    if (show) {
      el.classList.remove("hidden__task");
    } else {
      el.classList.add("hidden__task");
    }
  });
}

d.addEventListener("DOMContentLoaded", (e) => {
  getData();
});

d.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target === $linkDaily) {
    $taskDayly = d.querySelectorAll(".dayly");
    $taskWeekly = d.querySelectorAll(".weekly");
    $taskMonthly = d.querySelectorAll(".monthly");

    $linkDaily.classList.add("active__link");
    $linkWeekly.classList.remove("active__link");
    $linkMonthly.classList.remove("active__link");

    changeTask($taskDayly, true);
    changeTask($taskWeekly);
    changeTask($taskMonthly);
  }

  if (e.target === $linkWeekly) {
    $taskDayly = d.querySelectorAll(".dayly");
    $taskWeekly = d.querySelectorAll(".weekly");
    $taskMonthly = d.querySelectorAll(".monthly");

    $linkWeekly.classList.add("active__link");
    $linkDaily.classList.remove("active__link");
    $linkMonthly.classList.remove("active__link");

    changeTask($taskDayly);
    changeTask($taskWeekly, true);
    changeTask($taskMonthly);
  }

  if (e.target === $linkMonthly) {
    $taskDayly = d.querySelectorAll(".dayly");
    $taskWeekly = d.querySelectorAll(".weekly");
    $taskMonthly = d.querySelectorAll(".monthly");

    $linkMonthly.classList.add("active__link");
    $linkDaily.classList.remove("active__link");
    $linkWeekly.classList.remove("active__link");

    changeTask($taskDayly);
    changeTask($taskWeekly);
    changeTask($taskMonthly, true);
  }
});
