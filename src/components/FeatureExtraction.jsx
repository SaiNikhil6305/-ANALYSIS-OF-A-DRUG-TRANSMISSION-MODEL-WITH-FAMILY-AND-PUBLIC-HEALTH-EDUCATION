import React, { useState, useEffect } from 'react';
import './FeatureExtraction.css';

function FeatureExtraction({ onAnalysisComplete }) {
  const [contextualFeatures, setContextualFeatures] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});
  const [behavioralData, setBehavioralData] = useState({});
  const [voiceAnalysis, setVoiceAnalysis] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate initial data loading
    startAnalysis();
  }, []);

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate API calls with mock data
    const mockData = {
      timestamp: new Date().toLocaleString(),
      location: "Home",
      medicalHistory: ["Hypertension", "Diabetes"],
      currentMeds: ["Metformin", "Lisinopril"],
      vitals: {
        bloodPressure: "120/80",
        heartRate: "72 bpm",
        temperature: "98.6°F"
      },
      symptoms: ["Fatigue", "Headache"],
      conditions: ["Type 2 Diabetes"],
      currentMood: "Stable",
      stressIndicators: "Low",
      sleepData: "7 hours/night",
      activityMetrics: "Moderate",
      voiceSamples: "Calm",
      speechPatterns: "Normal",
      emotionalIndicators: "Positive"
    };

    // Process each feature with delays to simulate real analysis
    setTimeout(() => {
      setContextualFeatures(extractContextualFeatures(mockData));
      
      setTimeout(() => {
        setHealthMetrics(extractHealthMetrics(mockData));
        
        setTimeout(() => {
          setBehavioralData(analyzeBehavioralEmotional(mockData));
          
          setTimeout(() => {
            setVoiceAnalysis(analyzeVoiceTone(mockData));
            setIsAnalyzing(false);
            onAnalysisComplete({
              contextual: contextualFeatures,
              health: healthMetrics,
              behavioral: behavioralData,
              voice: voiceAnalysis
            });
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  const extractContextualFeatures = (data) => ({
    "Time of Analysis": data.timestamp,
    "Location": data.location,
    "Medical History": data.medicalHistory.join(", "),
    "Current Medications": data.currentMeds.join(", ")
  });

  const extractHealthMetrics = (data) => ({
    "Blood Pressure": data.vitals.bloodPressure,
    "Heart Rate": data.vitals.heartRate,
    "Temperature": data.vitals.temperature,
    "Current Symptoms": data.symptoms.join(", ")
  });

  const analyzeBehavioralEmotional = (data) => ({
    "Current Mood": data.currentMood,
    "Stress Level": data.stressIndicators,
    "Sleep Pattern": data.sleepData,
    "Activity Level": data.activityMetrics
  });

  const analyzeVoiceTone = (data) => ({
    "Voice Tone": data.voiceSamples,
    "Speech Pattern": data.speechPatterns,
    "Emotional State": data.emotionalIndicators
  });

  return (
    <div className="feature-extraction">
      <h2>Health Analysis System</h2>
      <button 
        className={`analyze-button ${isAnalyzing ? 'analyzing' : ''}`}
        onClick={startAnalysis}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? 'Analyzing...' : 'Start New Analysis'}
      </button>
      
      <div className="analysis-grid">
        <div className={`analysis-card contextual ${isAnalyzing ? 'loading' : ''}`}>
          <h3>Contextual Features</h3>
          <div className="feature-content">
            {isAnalyzing ? (
              <div className="loading-spinner"></div>
            ) : (
              <ul>
                {Object.entries(contextualFeatures).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={`analysis-card health-metrics ${isAnalyzing ? 'loading' : ''}`}>
          <h3>Health Metrics</h3>
          <div className="feature-content">
            {isAnalyzing ? (
              <div className="loading-spinner"></div>
            ) : (
              <ul>
                {Object.entries(healthMetrics).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={`analysis-card behavioral ${isAnalyzing ? 'loading' : ''}`}>
          <h3>Behavioral & Emotional</h3>
          <div className="feature-content">
            {isAnalyzing ? (
              <div className="loading-spinner"></div>
            ) : (
              <ul>
                {Object.entries(behavioralData).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={`analysis-card voice ${isAnalyzing ? 'loading' : ''}`}>
          <h3>Voice & Speech Analysis</h3>
          <div className="feature-content">
            {isAnalyzing ? (
              <div className="loading-spinner"></div>
            ) : (
              <ul>
                {Object.entries(voiceAnalysis).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureExtraction; 