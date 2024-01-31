import * as Tone from "tone"

export const triggerEvents = () => {
  console.log("started")
  Tone.Transport.start()
}
export const stopEvents = () => {
  console.log("stopped")
  Tone.Transport.stop()
}
export const handleToneBackend = (from, to, type, nodes) => {

  console.log("tone backend: ", from, to)

  if (type === "node2node") {
    const fromNode = nodes.find((node) => node.id === from)
    const toNode = nodes.find((node) => node.id === to)
  
    if (fromNode.output.includes(toNode.id)) {
      console.log("Tone backend connection has already been established")
      return 
    }

    if (!fromNode || !toNode) {
      console.log("one or both nodes are invalid")
    }
  
    if (toNode.name === "Destination"){
      fromNode.Tone.toDestination()
  
    } else {
      if (toNode.Tone) {
        fromNode.Tone.connect(toNode.Tone)
      }
    }
  } else {
    const [toId, whichParam] = to.split("=");
 
    const fromNode = nodes.find((node) => node.id === from)
    const toNode = nodes.find((node) => node.id === toId)
  
    if (!fromNode || !toNode) {
      console.log("one or both nodes are invalid")
      return
    }

    if (fromNode.output.includes(to)) {
      console.log("Tone parameter connection has already been established")
      return 
    }

    fromNode.Tone.connect(toNode.Tone[whichParam])    


  }

}

export const invokeTriggerEvent = (triggerData, nodes) => {
  if (!triggerData.instruments || triggerData.instruments.length <= 0) {
    return
  }
  if (triggerData.notes) {
    let noteDuration = (60 / triggerData.bpm)
    const instruments = nodes.filter(node => triggerData.instruments.includes(node.id));
    if (Array.isArray(triggerData.notes)) {
      noteDuration /= triggerData.notes.length

      if (instruments.length > 1) {
        for (let i = 0; i < triggerData.notes.length; i++) {
          setTimeout(() => {
            instruments.forEach(instrument => {
              instrument.Tone.triggerAttackRelease(triggerData.notes[i], noteDuration);
            })
          }, i * noteDuration * 1000); 
        } 
      } else {
        for (let i = 0; i < triggerData.notes.length; i++) {
          setTimeout(() => {
            instruments[0].Tone.triggerAttackRelease(triggerData.notes[i], noteDuration);
          }, i * noteDuration * 1000); 
        }
      }

    } else {
      if (instruments.length > 1) {
        console.log(instruments)
        instruments.forEach((instrument) => {
          instrument.Tone.triggerAttackRelease(triggerData.notes, noteDuration)
        })
      } else {
        instruments[0].Tone.triggerAttackRelease(triggerData.notes, noteDuration);
      }
    }
  }
};



export const disposeToneNode = (node) => {
  node.Tone.dispose()
}

export const getToneObject = (nodeName ) => {
  switch (nodeName) {
    case "Clock":
      return {bpm: 120, timeSignature: 4}
    case "Gain":
      return new Tone.Gain(.5)
    case "Oscillator":
      return new Tone.Oscillator(440, "sine")
    case "AMOscillator":
        return  new Tone.AMOscillator(263.61, "sine") 
    case "FMOscillator":
        return  new Tone.FMOscillator(263.61, "sine") 
    case "FatOscillator":
      return new Tone.FatOscillator(440, "sine", 40)
    case "LFO":
      return  new Tone.LFO(1, 1, 1000) 
    case "Noise":
      return  new Tone.Noise("pink") 
    case "PWMOscillator":
      return  new Tone.PWMOscillator(440, .1) 
    case "OmniOscillator":
      return  new Tone.OmniOscillator(263.61, "pwm")
    case "PulseOscillator":
      return  new Tone.PulseOscillator(263.61, .1)
    case "AMSynth":
      return new Tone.AMSynth()
    case "Synth":
      return  new Tone.Synth()
    case "AutoFilter":
      return  new Tone.AutoFilter(1, 263.61, 1) 
    case "AutoPanner":
      return  new Tone.AutoPanner("1n") 
    case "BitCrusher":
      return  new Tone.BitCrusher(1)
    case "Chebyshev":
      return  new Tone.Chebyshev(1)
    case "Chorus":
      return  new Tone.Chorus(1, .25, 1)
    case "Distortion":
      return  new Tone.Distortion(0)
    case "FrequencyShifter": 
      return  new Tone.FrequencyShifter(0)
    case "PitchShift":
      return  new Tone.PitchShift(0)
    case "Abs":
      return  new Tone.Abs()
    case "Add":
      return  new Tone.Add()
    case "AudioToGain":
      return  new Tone.AudioToGain()
    case "GainToAudio":
      return  new Tone.GainToAudio()
    case "GreaterThan":
      return  new Tone.GreaterThan(0)
    case "GreaterThanZero":
      return  new Tone.GreaterThanZero()
    case "Multiply":
      return  new Tone.Multiply(1)
    case "Negate":
      return  new Tone.Negate()
    case "Pow":
      return  new Tone.Pow(1)
    case "Scale":
      return  new Tone.Scale(0, 1)
    case "ScaleExp":
      return  new Tone.ScaleExp(0, 1, 1)
    case "Signal":
      return  new Tone.Signal(440, "frequency")
    case "Subtract":
      return  new Tone.Subtract(0)
    case "AmplitudeEnvelope":
      return  new Tone.AmplitudeEnvelope(.1, .2, .5, .6)
    case "Analyser": 
      return  new Tone.Analyser("waveform", 128)
    case "Channel": 
      return  new Tone.Channel(12, 0)
    case "Compressor": 
      return  new Tone.Compressor(-12, 5)
    case "CrossFade": 
      return  new Tone.CrossFade(0)
    case "EQ3": 
      return  new Tone.EQ3(0, 0, 0)
    case "Envelope": 
      return  new Tone.Envelope(.1, .2, .5, .6)
    case "FeedbackCombFilter": 
      return  new Tone.FeedbackCombFilter(.1, .2)
    case "Filter": 
      return  new Tone.Filter(263.61, "lowpass")
    case "Follower": 
      return  new Tone.Follower(.25)
    case "FrequencyEnvelope": 
      return  new Tone.FrequencyEnvelope(.1, .2, .5, .6)
    case "Limiter": 
      return  new Tone.Limiter(-12)
    case "AutoWah": 
      return  new Tone.AutoWah(123, 1)
    case "FeedbackDelay": 
      return  new Tone.FeedbackDelay(.25, .5)
    case "Freeverb": 
      return  new Tone.FeedbackDelay(.5, .5)
    case "Phaser": 
      return  new Tone.Phaser(263.6, 0, 263.6)
    case "PingPongDelay": 
      return  new Tone.PingPongDelay(.25, .5)
    case "Reverb": 
      return  new Tone.Reverb(.78)
    case "Tremolo": 
      return  new Tone.Tremolo(5, 1)
    case "Vibrato": 
      return  new Tone.Vibrato(5, 1)
    case "MembraneSynth": 
      return  new Tone.MembraneSynth({pitchDecay: 0})
    case "MetalSynth": 
      return  new Tone.MetalSynth()
    case "NoiseSynth": 
      return  new Tone.NoiseSynth()
    case "PluckSynth": 
      return  new Tone.PluckSynth()
    default:
      return null; // Return null for unknown node types or if no tone object is provided
  }
}

export const getNodeParameters = (name, type) => {
  console.log(name)
  if (name === "Destiantion" || name === "Transporter") {
    return null
  }

  const commonOscParams = {
    osc: {
      detune: 0,
      frequency: 0,
      type: "sine",
      phase: 0,
      partialCount: 0,
      partials: 0,
    }
  }

  const commonSynthesizerParameters = {
    
  }

  

  const nodeParams = {

    Core: {
      Destination: null,
      Transporter: null,
      Gain: {gain: 0}
    },

    Source: {
      Oscillator: {
        ...commonOscParams
      }, 
      FatOscillator: {
        ...commonOscParams,
        spread: 0,
        count: 1
      },
      PWMOscillator: {
        ...commonOscParams, 
        modulationFrequency: 0, 
      },
      PulseOscillator: {
        ...commonOscParams, 
        width: 0
      },
      Noise: {
        noise: null
      },
      AMOscillator: {
        ...commonOscParams,
        harmonicity: 0,
        modulationType: "sine", 
      },
      FMOscillator: {
        ...commonOscParams, 
        harmonicity: 0,
        modulationIndex: 0,
        modulationType: "sine"
      }, 

      LFO: {
        frequency: 0,
        min: -10000,
        max: 10000,
        amplitude: 1,
      },

      
    }, 
  }
  
  const OmniOscillator = {
    osc: {...nodeParams.Source.Oscillator}, 
    fat: {...nodeParams.Source.FatOscillator},
    pwm: {...nodeParams.Source.PWMOscillator}, 
    pulse: {...nodeParams.Source.PulseOscillator}, 
    am: {...nodeParams.Source.AMOscillator}, 
    fm: {...nodeParams.Source.FMOscillator},
  }

  const envelope = {
    attack: .1, 
    decay: .2,
    sustain: .5, 
    release: .6,
  }

  const commonSynthParams = {
    frequency: 440, 
    detune: 0, 
    envelope: {...envelope},
    portamento: 0,
    oscillator: {...OmniOscillator}
  }
  
  const InstrumentParams = {
      AMSynth: {
        frequency: 440,
        detune: 0, 
        harmonicity: 1,
        envelope: {...envelope},
        modulationEnvelope: {...envelope},
        portamento: 0,
        oscillator: {...OmniOscillator}, 
        modulation: {...OmniOscillator},
      }, 
      Synth: {
        ...commonSynthParams
      }
    }
  if (name === "OmniOscillator") {
    return OmniOscillator
  }
  if (type === "Instrument") {
    return InstrumentParams[name]
  }

  return nodeParams[type][name]
}  





export const initialStates = { 
                  attack:             {value: .1,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  decay:              {value: .2,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  sustain:            {value: .5,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  release:            {value: .6,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  detune:             {value:  0,     min: -1200, max: 1200,  multiplier:  1      , float: false   ,centered: true , hasInput: true     },
                  portamento:         {value:  0,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  frequency:          {value:  440,   min: 20,    max: 8192,  multiplier: 1       , float: false   ,centered: false, hasInput: true     },
                  phase:              {value:  0,     min: 0,     max: 360,   multiplier: 1       , float: false   ,centered: false, hasInput: false    },
                  modulationFrequency:{value:  0.1,   min: .1,    max: 440,   multiplier: .1      , float: true    ,centered: false, hasInput: true     },
                  pitchDecay:         {value:  0,     min: 0,     max: 1,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  harmonicity:        {value:  1,     min: .1,    max: 10,    multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  octaves:            {value:  0,     min: 0,     max: 8,     multiplier: .001    , float: true    ,centered: false, hasInput: true     },
                  width:              {value:  0,     min: -1,    max: 1,     multiplier: .01     , float: true    ,centered: true , hasInput: true     },
                  spread:             {value:  1,     min: -1200, max: 100,   multiplier: 1       , float: false   ,centered: false, hasInput: true     },
                  partials:           {value:  0,     min: 0,     max: 24,    multiplier: 1       , float: false   ,centered: false, hasInput: true     },
                  gain:               {value:  .5,    min: 0,     max: 1,     multiplier: 0.01     , float: true    ,centered: false, hasInput: true     },
                  count:              {value:  1,     min: 1,     max: 12,    multiplier: 1       , float: false   ,centered: false, hasInput: true     },
                  resonance:          {value:  0,     min: 0,     max: 7000,  multiplier:  1      , float: false   ,centered: false, hasInput: true     },
                  modulationIndex:    {value:  1,     min: 1,     max: 100,   multiplier:  1      , float: false   ,centered: false, hasInput: false    },
                  dampening:          {value:  1,     min: 1,     max: 7000,  multiplier:  1      , float: false   ,centered: false, hasInput: true     },
                  attackNoise:        {value:  1,     min: .1,    max: 20,    multiplier:  .01    , float: true    ,centered: false, hasInput: true     },

}

export const LFOStates = {
                  frequency:          {value:  1,   min: .1,        max: 10,     multiplier: .1      , float: true    ,centered: false, hasInput: true      },
                  min:                {value:  -1,  min: -10000,    max: 10000,  multiplier: 1       , float: false   ,centered: false, hasInput: false     },
                  max:                {value:  1,   min: -10000,    max: 10000,  multiplier: 1       , float: false   ,centered: false, hasInput: false     },
                  amplitude:          {value:  1,   min: .001,      max: 1,      multiplier: .001    , float: true    ,centered: false, hasInput: true     },
}