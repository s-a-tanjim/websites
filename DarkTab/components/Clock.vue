<template>
  <div class="clock-container">
    <div class="clock-col">
      <p class="clock-day clock-timer"></p>
      <p class="clock-label">Day</p>
    </div>
    <div class="clock-col">
      <p class="clock-hours clock-timer"></p>
      <p class="clock-label"><span class="clock-am-pm"></span> / Hours</p>
    </div>
    <div class="clock-col">
      <p class="clock-minutes clock-timer"></p>
      <p class="clock-label">Minutes</p>
    </div>
    <div class="clock-col">
      <p class="clock-seconds clock-timer"></p>
      <p class="clock-label">Seconds</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
function updateTime() {
  document.documentElement.style.setProperty(
    "--timer-day",
    "'" + moment().format("dd") + "'"
  );
  document.documentElement.style.setProperty(
    "--timer-hours",
    "'" + moment().format("hh") + "'"
  );
  document.documentElement.style.setProperty(
    "--timer-am-pm",
    "'" + moment().format("A") + "'"
  );
  document.documentElement.style.setProperty(
    "--timer-minutes",
    "'" + moment().format("mm") + "'"
  );
  document.documentElement.style.setProperty(
    "--timer-seconds",
    "'" + moment().format("ss") + "'"
  );
  requestAnimationFrame(updateTime);
}
export default {
  mounted() {
    requestAnimationFrame(updateTime);
  },
  methods: {},
};
</script>

<style scoped>
.clock-day:before {
  content: var(--timer-day);
}
.clock-hours:before {
  content: var(--timer-hours);
}
.clock-am-pm:before {
  content: var(--timer-am-pm);
}
.clock-minutes:before {
  content: var(--timer-minutes);
}
.clock-seconds:before {
  content: var(--timer-seconds);
}
.clock-container {
  /*font-family: "Montserrat", "sans-serif";*/
  margin: 30px auto;
  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.15),
    0 15px 90px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  width: fit-content;
}
.clock-col {
  text-align: center;
  margin-right: 40px;
  margin-left: 40px;
  min-width: 90px;
  position: relative;
}
.clock-col:not(:last-child):before,
.clock-col:not(:last-child):after {
  content: "";
  background-color: rgba(255, 255, 255, 0.3);
  height: 5px;
  width: 5px;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: -42px;
}
.clock-col:not(:last-child):before {
  top: 35%;
}
.clock-col:not(:last-child):after {
  top: 50%;
}
.clock-timer:before {
  color: #fff;
  font-size: 4.2rem;
  text-transform: uppercase;
}
.clock-am-pm{
  font-size: 1rem;
  color: #fff;
}
.clock-label {
  color: rgba(255, 255, 255, 0.35);
  text-transform: uppercase;
  font-size: 0.7rem;
  margin-top: 10px;
}
@media (max-width: 825px) {
  .clock-container {
    flex-direction: column;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .clock-col + .clock-col {
    margin-top: 20px;
  }
  .clock-col:before,
  .clock-col:after {
    display: none !important;
  }
}
</style>