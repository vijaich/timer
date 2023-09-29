import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerNum: 25 * 60,
    timeElapsedInSeconds: 0,
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.timerInterval = setInterval(this.updateTimer, 1000)
    }

    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  updateTimer = () => {
    const {timeElapsedInSeconds, timerNum} = this.state

    if (timeElapsedInSeconds >= timerNum) {
      this.clearTimerInterval()
      this.setState({
        isTimerRunning: false,
        timeElapsedInSeconds: 0,
      })
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.timerInterval)
  }

  onDecreaseBtn = () => {
    const {isTimerRunning, timerNum} = this.state
    if (!isTimerRunning && timerNum > 60) {
      this.setState(prevState => ({
        timerNum: prevState.timerNum - 60,
      }))
    }
  }

  onIncreaseBtn = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.setState(prevState => ({
        timerNum: prevState.timerNum + 60,
      }))
    }
  }

  onReset = () => {
    this.setState({
      timerNum: 25 * 60,
      timeElapsedInSeconds: 0,
      isTimerRunning: false,
    })
    this.clearTimerInterval()
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  render() {
    const {isTimerRunning, timerNum, timeElapsedInSeconds} = this.state
    const minutes = Math.floor((timerNum - timeElapsedInSeconds) / 60)
    const remainingSeconds = (timerNum - timeElapsedInSeconds) % 60
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`

    const pauseResumeUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="timer-bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-bg-image">
            <div className="timer">
              <h1 className="timer-num">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="pause-resume">
                {!isTimerRunning ? 'Paused' : 'Running'}
              </p>
            </div>
          </div>
          <div className="timer-control-sec">
            <div className="resume-pause-container">
              <div className="pause-resume-icon">
                <button type="button" onClick={this.onStartOrPauseTimer}>
                  <img
                    src={pauseResumeUrl}
                    className="icon"
                    alt={!isTimerRunning ? 'play icon' : 'pause icon'}
                  />
                </button>
                <button type="button" className="start-pause-btn">
                  {!isTimerRunning ? 'Start' : 'Pause'}
                </button>
              </div>
              <div className="pause-resume-icon">
                <button type="button" onClick={this.onReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                </button>
                <button type="button" className="start-pause-btn">
                  Reset
                </button>
              </div>
            </div>
            <p className="timer-limit-description">Set Timer Limit</p>
            <div className="button-sec">
              <button type="button" onClick={this.onDecreaseBtn}>
                -
              </button>
              <p className="timer-number">{minutes}</p>
              <button type="button" onClick={this.onIncreaseBtn}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
