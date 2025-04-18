import { useState, useEffect } from 'react'
import './App.css'

// First, add this symptoms database (you can move this to a separate file later)
const symptomsDatabase = {
  fever: {
    description: "Elevated body temperature above normal (98.6°F/37°C)",
    medicines: [
      {
        name: "Paracetamol (Acetaminophen)",
        brand: "Tylenol, Crocin",
        otcStatus: true, // over the counter
        details: {
          effectiveness: "Highly effective for fever reduction",
          safetyLevel: "Generally safe",
          dosage: "500-1000mg every 4-6 hours",
          maxDose: "Do not exceed 4000mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Safe for most adults",
            "Consult doctor if fever persists beyond 3 days",
            "Avoid alcohol consumption"
          ]
        }
      },
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Effective for fever and associated body aches",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "Do not exceed 1200mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May cause stomach irritation",
            "Take with food",
            "Not recommended for people with stomach ulcers"
          ]
        }
      },
      {
        name: "Aspirin",
        brand: "Bayer, Disprin",
        otcStatus: true,
        details: {
          effectiveness: "Effective for fever reduction",
          safetyLevel: "Moderate risk",
          dosage: "325-650mg every 4-6 hours",
          maxDose: "Do not exceed 4000mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Not recommended for children under 18",
            "May cause stomach bleeding",
            "Avoid if on blood thinners"
          ]
        }
      },
      // Add more medicines...
    ],
    generalAdvice: [
      "Stay hydrated",
      "Get plenty of rest",
      "Seek medical attention if fever persists over 3 days",
      "Seek immediate medical attention if fever exceeds 103°F (39.4°C)"
    ]
  },
  cold: {
    description: "Common viral infection of the upper respiratory tract",
    medicines: [
      {
        name: "Dextromethorphan",
        brand: "Robitussin, Delsym",
        otcStatus: true,
        details: {
          effectiveness: "Effective for cough suppression",
          safetyLevel: "Generally safe",
          dosage: "10-20mg every 4 hours",
          maxDose: "Do not exceed 120mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Avoid alcohol",
            "Not recommended for productive coughs"
          ]
        }
      },
      {
        name: "Pseudoephedrine",
        brand: "Sudafed",
        otcStatus: true,
        details: {
          effectiveness: "Effective for nasal congestion",
          safetyLevel: "Moderate risk",
          dosage: "60mg every 4-6 hours",
          maxDose: "240mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May increase blood pressure",
            "Avoid if you have heart conditions",
            "May cause insomnia"
          ]
        }
      },
      {
        name: "Diphenhydramine",
        brand: "Benadryl",
        otcStatus: true,
        details: {
          effectiveness: "Helps with runny nose and sneezing",
          safetyLevel: "Generally safe",
          dosage: "25-50mg every 4-6 hours",
          maxDose: "300mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Causes drowsiness",
            "Do not drive or operate machinery",
            "Avoid alcohol consumption"
          ]
        }
      }
    ],
    generalAdvice: [
      "Get plenty of rest",
      "Stay hydrated with warm fluids",
      "Use a humidifier to add moisture to the air",
      "Gargle with warm salt water for sore throat",
      "Wash hands frequently to prevent spread"
    ]
  },
  headache: {
    description: "Pain or discomfort in the head, scalp, or neck",
    medicines: [
      {
        name: "Paracetamol",
        brand: "Tylenol, Crocin",
        otcStatus: true,
        details: {
          effectiveness: "Effective for mild to moderate headaches",
          safetyLevel: "Generally safe",
          dosage: "500-1000mg every 4-6 hours",
          maxDose: "Do not exceed 4000mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Safe for most adults",
            "Avoid alcohol consumption",
            "Do not take with other paracetamol-containing products"
          ]
        }
      },
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Highly effective for tension headaches",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "Do not exceed 1200mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Not recommended for those with stomach ulcers"
          ]
        }
      }
    ],
    generalAdvice: [
      "Rest in a quiet, dark room",
      "Apply cold or warm compress to head/neck",
      "Stay hydrated",
      "Avoid bright lights and loud sounds",
      "Seek medical attention if headache is severe or persistent"
    ]
  },
  cough: {
    description: "Reflex action to clear airways of irritants or mucus",
    medicines: [
      {
        name: "Dextromethorphan",
        brand: "Robitussin, Delsym",
        otcStatus: true,
        details: {
          effectiveness: "Effective for dry coughs",
          safetyLevel: "Generally safe",
          dosage: "10-20mg every 4 hours",
          maxDose: "Do not exceed 120mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Not recommended for productive coughs",
            "Avoid alcohol"
          ]
        }
      },
      {
        name: "Guaifenesin",
        brand: "Mucinex",
        otcStatus: true,
        details: {
          effectiveness: "Effective for wet, productive coughs",
          safetyLevel: "Generally safe",
          dosage: "200-400mg every 4 hours",
          maxDose: "2400mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Drink plenty of water",
            "May increase mucus production",
            "Contact doctor if cough persists over 7 days"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay hydrated",
      "Use a humidifier",
      "Avoid irritants like smoke",
      "Try honey for natural relief",
      "Seek medical attention if cough persists over a week"
    ]
  },
  stomachache: {
    description: "Pain or discomfort in the abdomen (stomach area)",
    medicines: [
      {
        name: "Antacids",
        brand: "Tums, Maalox, Gaviscon",
        otcStatus: true,
        details: {
          effectiveness: "Quick relief for acid-related stomach pain",
          safetyLevel: "Very safe",
          dosage: "2-4 tablets as needed",
          maxDose: "Follow package instructions, usually max 7 doses per day",
          requiresPrescription: false,
          warnings: [
            "Take between meals",
            "Don't lie down for 30 minutes after taking",
            "May interact with other medications",
            "Not for long-term use without medical advice"
          ]
        }
      },
      {
        name: "Bismuth Subsalicylate",
        brand: "Pepto-Bismol, Kaopectate",
        otcStatus: true,
        details: {
          effectiveness: "Effective for upset stomach and diarrhea",
          safetyLevel: "Generally safe",
          dosage: "30ml or 2 tablets every 30-60 minutes as needed",
          maxDose: "Do not exceed 8 doses in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May cause dark stools",
            "Not for use with aspirin allergy",
            "Not recommended for children under 12",
            "Avoid if you have bleeding disorders"
          ]
        }
      },
      {
        name: "Simethicone",
        brand: "Gas-X, Mylanta Gas",
        otcStatus: true,
        details: {
          effectiveness: "Effective for gas-related stomach pain",
          safetyLevel: "Very safe",
          dosage: "125-250mg up to 4 times daily",
          maxDose: "Do not exceed 500mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take after meals",
            "Safe during pregnancy",
            "Contact doctor if symptoms persist more than 14 days"
          ]
        }
      },
      {
        name: "Omeprazole",
        brand: "Prilosec",
        otcStatus: true,
        details: {
          effectiveness: "Effective for acid reflux and heartburn",
          safetyLevel: "Generally safe",
          dosage: "20mg once daily",
          maxDose: "20mg per day",
          requiresPrescription: false,
          warnings: [
            "Take before meals",
            "Not for immediate relief",
            "Do not use for more than 14 days without consulting doctor",
            "May increase risk of bone fractures with long-term use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Eat smaller meals more frequently",
      "Avoid spicy, fatty, or acidic foods",
      "Stay hydrated with clear fluids",
      "Avoid lying down for 2-3 hours after eating",
      "Try using a heating pad on your stomach",
      "Practice stress reduction techniques",
      "Keep track of foods that trigger pain",
      "Seek immediate medical attention if pain is severe or accompanied by fever"
    ]
  },
  "high blood pressure": {
    description: "Elevated blood pressure above 130/80 mmHg",
    medicines: [
      {
        name: "Amlodipine",
        brand: "Norvasc",
        otcStatus: false,
        details: {
          effectiveness: "Effective calcium channel blocker for blood pressure control",
          safetyLevel: "Generally safe with monitoring",
          dosage: "2.5-10mg once daily",
          maxDose: "10mg per day",
          requiresPrescription: true,
          warnings: [
            "Regular blood pressure monitoring required",
            "May cause ankle swelling",
            "Avoid grapefruit juice",
            "Do not stop medication suddenly"
          ]
        }
      },
      {
        name: "Lisinopril",
        brand: "Zestril, Prinivil",
        otcStatus: false,
        details: {
          effectiveness: "Effective ACE inhibitor for blood pressure control",
          safetyLevel: "Generally safe with monitoring",
          dosage: "10-40mg once daily",
          maxDose: "40mg per day",
          requiresPrescription: true,
          warnings: [
            "Monitor kidney function",
            "May cause dry cough",
            "Avoid during pregnancy",
            "Regular blood pressure checks needed"
          ]
        }
      }
    ],
    generalAdvice: [
      "Monitor blood pressure regularly",
      "Reduce salt intake",
      "Maintain healthy weight",
      "Exercise regularly",
      "Limit alcohol consumption",
      "Quit smoking",
      "Manage stress levels",
      "Take medications as prescribed",
      "Keep a blood pressure diary"
    ]
  },
  "low blood pressure": {
    description: "Blood pressure below 90/60 mmHg",
    medicines: [
      {
        name: "Fludrocortisone",
        brand: "Florinef",
        otcStatus: false,
        details: {
          effectiveness: "Effective for treating low blood pressure",
          safetyLevel: "Requires medical supervision",
          dosage: "0.1-0.2mg daily",
          maxDose: "As prescribed by doctor",
          requiresPrescription: true,
          warnings: [
            "Regular monitoring required",
            "May affect potassium levels",
            "Watch for swelling",
            "Follow doctor's instructions carefully"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay hydrated",
      "Increase salt intake (under medical supervision)",
      "Eat smaller, more frequent meals",
      "Stand up slowly from sitting/lying position",
      "Avoid prolonged standing",
      "Wear compression stockings if recommended",
      "Avoid hot showers",
      "Exercise regularly but moderately",
      "Report severe symptoms to doctor immediately"
    ]
  },
  "bone pain": {
    description: "Pain, tenderness, or aching in the bones or joints",
    medicines: [
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Effective for bone and joint pain",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "Do not exceed 1200mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Not recommended for those with stomach ulcers",
            "Avoid long-term use without medical supervision"
          ]
        }
      },
      {
        name: "Naproxen",
        brand: "Aleve",
        otcStatus: true,
        details: {
          effectiveness: "Long-lasting relief for bone and joint pain",
          safetyLevel: "Moderate risk",
          dosage: "220-440mg every 8-12 hours",
          maxDose: "660mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May increase risk of heart attack or stroke",
            "Not recommended for long-term use",
            "Avoid if you have kidney problems"
          ]
        }
      },
      {
        name: "Acetaminophen",
        brand: "Tylenol",
        otcStatus: true,
        details: {
          effectiveness: "Moderate relief for mild bone pain",
          safetyLevel: "Generally safe",
          dosage: "500-1000mg every 4-6 hours",
          maxDose: "Do not exceed 4000mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Safe for most adults",
            "Avoid alcohol consumption",
            "Do not combine with other acetaminophen products",
            "May not be as effective as NSAIDs for bone pain"
          ]
        }
      },
      {
        name: "Diclofenac",
        brand: "Voltaren",
        otcStatus: false,
        details: {
          effectiveness: "Strong relief for severe bone and joint pain",
          safetyLevel: "Requires monitoring",
          dosage: "As prescribed by doctor",
          maxDose: "Follow prescription instructions",
          requiresPrescription: true,
          warnings: [
            "Regular monitoring required",
            "May affect liver function",
            "Increased risk of cardiovascular events",
            "Not for long-term use without medical supervision"
          ]
        }
      }
    ],
    generalAdvice: [
      "Apply heat or cold therapy as recommended",
      "Practice gentle stretching exercises",
      "Maintain good posture",
      "Get adequate calcium and vitamin D",
      "Consider physical therapy",
      "Use supportive footwear",
      "Avoid overexertion",
      "Get adequate rest",
      "Seek medical attention if pain is severe or persistent",
      "Consider weight management to reduce stress on bones and joints"
    ]
  },
  "sore throat": {
    description: "Pain, irritation, or scratchiness in the throat",
    medicines: [
      {
        name: "Benzocaine",
        brand: "Cepacol, Chloraseptic",
        otcStatus: true,
        details: {
          effectiveness: "Temporary relief from throat pain",
          safetyLevel: "Generally safe",
          dosage: "1 lozenge every 2 hours as needed",
          maxDose: "Do not exceed 8 lozenges per day",
          requiresPrescription: false,
          warnings: [
            "Do not use for more than 2 days",
            "Not for children under 5",
            "May cause numbness in mouth"
          ]
        }
      },
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Reduces throat pain and inflammation",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "Do not exceed 1200mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Not for long-term use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Gargle with warm salt water",
      "Stay hydrated with warm liquids",
      "Use throat lozenges",
      "Rest your voice",
      "Use a humidifier",
      "Seek medical attention if symptoms persist over 1 week"
    ]
  },
  "allergies": {
    description: "Immune system response to substances like pollen, dust, or pet dander",
    medicines: [
      {
        name: "Cetirizine",
        brand: "Zyrtec",
        otcStatus: true,
        details: {
          effectiveness: "24-hour relief from allergy symptoms",
          safetyLevel: "Generally safe",
          dosage: "10mg once daily",
          maxDose: "10mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Avoid alcohol",
            "Do not exceed recommended dose"
          ]
        }
      },
      {
        name: "Loratadine",
        brand: "Claritin",
        otcStatus: true,
        details: {
          effectiveness: "Non-drowsy 24-hour relief",
          safetyLevel: "Very safe",
          dosage: "10mg once daily",
          maxDose: "10mg per day",
          requiresPrescription: false,
          warnings: [
            "Take at the same time each day",
            "Safe for long-term use",
            "Consult doctor if pregnant"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay indoors when pollen counts are high",
      "Use air purifiers",
      "Keep windows closed during high pollen seasons",
      "Shower after outdoor activities",
      "Clean home regularly to reduce allergens"
    ]
  },
  "diarrhea": {
    description: "Frequent loose or watery bowel movements",
    medicines: [
      {
        name: "Loperamide",
        brand: "Imodium",
        otcStatus: true,
        details: {
          effectiveness: "Quick relief from diarrhea",
          safetyLevel: "Generally safe",
          dosage: "Initial 4mg, then 2mg after each loose stool",
          maxDose: "Do not exceed 8mg per day",
          requiresPrescription: false,
          warnings: [
            "Stop if symptoms worsen",
            "Not for children under 6",
            "Seek medical attention if fever occurs"
          ]
        }
      },
      {
        name: "Bismuth Subsalicylate",
        brand: "Pepto-Bismol, Kaopectate",
        otcStatus: true,
        details: {
          effectiveness: "Relieves diarrhea and upset stomach",
          safetyLevel: "Generally safe",
          dosage: "30ml or 2 tablets every 30-60 minutes",
          maxDose: "Do not exceed 8 doses in 24 hours",
          requiresPrescription: false,
          warnings: [
            "May cause dark stools",
            "Not for use with aspirin allergy",
            "Avoid if you have bleeding disorders"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay hydrated with clear fluids",
      "Eat bland foods (BRAT diet)",
      "Avoid dairy and spicy foods",
      "Replace electrolytes",
      "Seek medical attention if symptoms persist over 2 days"
    ]
  },
  "insomnia": {
    description: "Difficulty falling asleep or staying asleep",
    medicines: [
      {
        name: "Diphenhydramine",
        brand: "Benadryl, Unisom",
        otcStatus: true,
        details: {
          effectiveness: "Short-term sleep aid",
          safetyLevel: "Moderate risk",
          dosage: "25-50mg at bedtime",
          maxDose: "50mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause morning drowsiness",
            "Not for long-term use",
            "Avoid alcohol",
            "Do not drive or operate machinery"
          ]
        }
      },
      {
        name: "Melatonin",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps regulate sleep cycle",
          safetyLevel: "Very safe",
          dosage: "0.5-5mg before bedtime",
          maxDose: "10mg per day",
          requiresPrescription: false,
          warnings: [
            "Start with lowest dose",
            "May cause vivid dreams",
            "Take 30-60 minutes before bedtime"
          ]
        }
      }
    ],
    generalAdvice: [
      "Maintain regular sleep schedule",
      "Create a relaxing bedtime routine",
      "Avoid screens before bedtime",
      "Keep bedroom cool and dark",
      "Avoid caffeine in the evening",
      "Exercise regularly but not close to bedtime",
      "Consider cognitive behavioral therapy for chronic insomnia"
    ]
  },
  "nausea": {
    description: "Feeling of sickness with an inclination to vomit",
    medicines: [
      {
        name: "Ondansetron",
        brand: "Zofran",
        otcStatus: false,
        details: {
          effectiveness: "Highly effective for nausea and vomiting",
          safetyLevel: "Generally safe with prescription",
          dosage: "4-8mg every 8 hours as needed",
          maxDose: "24mg per day",
          requiresPrescription: true,
          warnings: [
            "May cause headache",
            "Can affect heart rhythm",
            "Take with water",
            "Consult doctor if pregnant"
          ]
        }
      },
      {
        name: "Dimenhydrinate",
        brand: "Dramamine",
        otcStatus: true,
        details: {
          effectiveness: "Effective for motion sickness and nausea",
          safetyLevel: "Generally safe",
          dosage: "50-100mg every 4-6 hours",
          maxDose: "400mg per day",
          requiresPrescription: false,
          warnings: [
            "Causes drowsiness",
            "Do not drive or operate machinery",
            "Avoid alcohol",
            "Not for long-term use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay hydrated with small sips of clear fluids",
      "Eat small, frequent meals",
      "Avoid strong odors",
      "Try ginger tea or candies",
      "Rest in a seated position",
      "Avoid fatty or spicy foods",
      "Seek medical attention if vomiting persists over 24 hours"
    ]
  },
  "back pain": {
    description: "Pain or discomfort in the upper, middle, or lower back",
    medicines: [
      {
        name: "Naproxen",
        brand: "Aleve",
        otcStatus: true,
        details: {
          effectiveness: "Effective for back pain and inflammation",
          safetyLevel: "Moderate risk",
          dosage: "220-440mg every 8-12 hours",
          maxDose: "660mg per day",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Not for long-term use without medical supervision",
            "Avoid if you have kidney problems"
          ]
        }
      },
      {
        name: "Cyclobenzaprine",
        brand: "Flexeril",
        otcStatus: false,
        details: {
          effectiveness: "Effective muscle relaxant for back pain",
          safetyLevel: "Requires monitoring",
          dosage: "5-10mg three times daily",
          maxDose: "30mg per day",
          requiresPrescription: true,
          warnings: [
            "Causes drowsiness",
            "Do not drive or operate machinery",
            "Avoid alcohol",
            "Short-term use only (2-3 weeks)"
          ]
        }
      }
    ],
    generalAdvice: [
      "Apply heat or cold therapy",
      "Practice good posture",
      "Do gentle stretching exercises",
      "Avoid heavy lifting",
      "Use proper lifting techniques",
      "Consider physical therapy",
      "Try massage therapy",
      "Seek medical attention if pain is severe or persistent"
    ]
  },
  "anxiety": {
    description: "Feelings of worry, nervousness, or unease",
    medicines: [
      {
        name: "Alprazolam",
        brand: "Xanax",
        otcStatus: false,
        details: {
          effectiveness: "Fast-acting anxiety relief",
          safetyLevel: "Controlled substance, requires careful monitoring",
          dosage: "As prescribed by doctor",
          maxDose: "Follow prescription strictly",
          requiresPrescription: true,
          warnings: [
            "Highly addictive",
            "Do not stop suddenly",
            "Do not drive until effects are known",
            "Avoid alcohol completely"
          ]
        }
      },
      {
        name: "Lavender Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Mild anxiety relief",
          safetyLevel: "Very safe",
          dosage: "80mg once or twice daily",
          maxDose: "160mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause mild stomach upset",
            "Consult doctor if pregnant",
            "May interact with other sedatives",
            "Stop use if allergic reactions occur"
          ]
        }
      }
    ],
    generalAdvice: [
      "Practice deep breathing exercises",
      "Try meditation or mindfulness",
      "Exercise regularly",
      "Maintain regular sleep schedule",
      "Limit caffeine and alcohol",
      "Consider counseling or therapy",
      "Join support groups",
      "Learn stress management techniques"
    ]
  },
  "skin rash": {
    description: "Inflammation, irritation, or discoloration of the skin",
    medicines: [
      {
        name: "Hydrocortisone Cream",
        brand: "Cortaid, Cortizone-10",
        otcStatus: true,
        details: {
          effectiveness: "Effective for mild skin inflammation",
          safetyLevel: "Generally safe for short-term use",
          dosage: "Apply thin layer 2-4 times daily",
          maxDose: "Do not use for more than 7 days",
          requiresPrescription: false,
          warnings: [
            "Do not cover with bandages unless directed",
            "Avoid use on face unless directed",
            "Do not use on broken skin",
            "Stop if condition worsens"
          ]
        }
      },
      {
        name: "Diphenhydramine",
        brand: "Benadryl",
        otcStatus: true,
        details: {
          effectiveness: "Relieves itching and allergic reactions",
          safetyLevel: "Generally safe",
          dosage: "25-50mg every 4-6 hours",
          maxDose: "300mg per day",
          requiresPrescription: false,
          warnings: [
            "Causes drowsiness",
            "Do not drive or operate machinery",
            "Avoid alcohol",
            "Not for long-term use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Keep affected area clean and dry",
      "Avoid scratching",
      "Use mild, unscented soaps",
      "Wear loose, cotton clothing",
      "Take cool showers",
      "Identify and avoid triggers",
      "Use moisturizer on dry skin",
      "Seek medical attention if rash is severe or spreading"
    ]
  },
  "toothache": {
    description: "Pain or inflammation in or around the teeth and jaws",
    medicines: [
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Effective for dental pain and inflammation",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "Do not exceed 1200mg in 24 hours",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Temporary solution - see dentist",
            "Not for long-term use"
          ]
        }
      },
      {
        name: "Benzocaine Gel",
        brand: "Orajel, Anbesol",
        otcStatus: true,
        details: {
          effectiveness: "Temporary numbing of tooth pain",
          safetyLevel: "Generally safe",
          dosage: "Apply small amount to affected area up to 4 times daily",
          maxDose: "Do not exceed 4 applications per day",
          requiresPrescription: false,
          warnings: [
            "Do not swallow",
            "Avoid eating while numb",
            "Not for children under 2",
            "Temporary relief only"
          ]
        }
      }
    ],
    generalAdvice: [
      "See a dentist as soon as possible",
      "Rinse with warm salt water",
      "Use dental floss to remove trapped food",
      "Apply cold compress for swelling",
      "Avoid very hot or cold foods",
      "Keep head elevated while sleeping",
      "Practice good oral hygiene"
    ]
  },
  "eye irritation": {
    description: "Discomfort, redness, or inflammation in the eyes",
    medicines: [
      {
        name: "Artificial Tears",
        brand: "Refresh, Systane",
        otcStatus: true,
        details: {
          effectiveness: "Relieves dryness and mild irritation",
          safetyLevel: "Very safe",
          dosage: "1-2 drops as needed",
          maxDose: "Use up to 4 times daily or as needed",
          requiresPrescription: false,
          warnings: [
            "Do not touch tip to eye",
            "Discard solution if cloudy",
            "Wait 5 minutes between different eye medications",
            "Remove contact lenses before use"
          ]
        }
      },
      {
        name: "Ketotifen",
        brand: "Zaditor, Alaway",
        otcStatus: true,
        details: {
          effectiveness: "Relieves allergy-related eye symptoms",
          safetyLevel: "Generally safe",
          dosage: "1 drop twice daily",
          maxDose: "2 drops per eye per day",
          requiresPrescription: false,
          warnings: [
            "May cause temporary burning",
            "Remove contact lenses",
            "Do not touch bottle tip",
            "Not for eye infections"
          ]
        }
      }
    ],
    generalAdvice: [
      "Avoid rubbing eyes",
      "Use cool compress",
      "Remove contact lenses",
      "Protect eyes from bright light",
      "Wash hands frequently",
      "Avoid eye makeup until resolved",
      "See doctor if condition worsens"
    ]
  },
  "muscle cramps": {
    description: "Sudden, involuntary muscle contractions causing pain",
    medicines: [
      {
        name: "Magnesium Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps prevent muscle cramps",
          safetyLevel: "Generally safe",
          dosage: "300-400mg daily",
          maxDose: "400mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause digestive issues",
            "Start with lower dose",
            "Take with food",
            "Consult doctor if on medications"
          ]
        }
      },
      {
        name: "Potassium Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps prevent muscle cramps",
          safetyLevel: "Moderate risk",
          dosage: "As recommended on package",
          maxDose: "Follow package instructions",
          requiresPrescription: false,
          warnings: [
            "Can interact with medications",
            "May affect heart rhythm",
            "Consult doctor before use",
            "Not for kidney problems"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stretch affected muscles gently",
      "Stay hydrated",
      "Maintain electrolyte balance",
      "Exercise regularly",
      "Avoid overexertion",
      "Wear proper footwear",
      "Consider massage therapy"
    ]
  },
  "motion sickness": {
    description: "Nausea and dizziness caused by movement",
    medicines: [
      {
        name: "Meclizine",
        brand: "Bonine, Antivert",
        otcStatus: true,
        details: {
          effectiveness: "Prevents motion sickness",
          safetyLevel: "Generally safe",
          dosage: "25-50mg 1 hour before travel",
          maxDose: "50mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Avoid alcohol",
            "Do not drive until effects known",
            "Not for children under 12"
          ]
        }
      },
      {
        name: "Ginger Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Natural relief for motion sickness",
          safetyLevel: "Very safe",
          dosage: "250mg every 6 hours",
          maxDose: "1000mg per day",
          requiresPrescription: false,
          warnings: [
            "May interact with blood thinners",
            "Take with food if stomach upset",
            "Start with lower dose",
            "Consult doctor if pregnant"
          ]
        }
      }
    ],
    generalAdvice: [
      "Sit in stable part of vehicle",
      "Focus on distant horizon",
      "Get fresh air",
      "Avoid heavy meals before travel",
      "Stay hydrated",
      "Try acupressure wristbands",
      "Avoid reading while moving"
    ]
  },
  "constipation": {
    description: "Difficulty or infrequent bowel movements",
    medicines: [
      {
        name: "Docusate Sodium",
        brand: "Colace, Dulcolax",
        otcStatus: true,
        details: {
          effectiveness: "Gentle stool softener",
          safetyLevel: "Very safe",
          dosage: "50-300mg daily",
          maxDose: "300mg per day",
          requiresPrescription: false,
          warnings: [
            "Drink plenty of water",
            "May take 1-3 days to work",
            "Not for long-term use",
            "Stop if abdominal pain occurs"
          ]
        }
      },
      {
        name: "Psyllium Husk",
        brand: "Metamucil",
        otcStatus: true,
        details: {
          effectiveness: "Natural fiber supplement",
          safetyLevel: "Very safe",
          dosage: "1 tablespoon 1-3 times daily",
          maxDose: "3 tablespoons per day",
          requiresPrescription: false,
          warnings: [
            "Take with plenty of water",
            "Start with small dose",
            "May cause bloating initially",
            "Space out from medications"
          ]
        }
      }
    ],
    generalAdvice: [
      "Increase fiber intake",
      "Stay hydrated",
      "Exercise regularly",
      "Establish regular bathroom routine",
      "Don't ignore urge to go",
      "Consider probiotic foods",
      "Avoid processed foods"
    ]
  },
  "sunburn": {
    description: "Skin damage from excessive sun exposure",
    medicines: [
      {
        name: "Aloe Vera Gel",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Soothes and moisturizes burned skin",
          safetyLevel: "Very safe",
          dosage: "Apply liberally as needed",
          maxDose: "Use as often as needed",
          requiresPrescription: false,
          warnings: [
            "Test small area first",
            "Avoid if allergic to aloe",
            "Store in cool place",
            "Use pure aloe when possible"
          ]
        }
      },
      {
        name: "Hydrocortisone Cream",
        brand: "Cortaid",
        otcStatus: true,
        details: {
          effectiveness: "Reduces inflammation and itching",
          safetyLevel: "Generally safe",
          dosage: "Apply thin layer 2-4 times daily",
          maxDose: "Use for up to 7 days",
          requiresPrescription: false,
          warnings: [
            "Not for severe burns",
            "Avoid covering with bandages",
            "Not for long-term use",
            "See doctor if blistering occurs"
          ]
        }
      }
    ],
    generalAdvice: [
      "Take cool showers or baths",
      "Stay hydrated",
      "Avoid further sun exposure",
      "Wear loose, soft clothing",
      "Use moisturizer",
      "Take OTC pain relievers if needed",
      "Seek medical attention for severe burns"
    ]
  },
  "menstrual cramps": {
    description: "Pain and discomfort during menstruation",
    medicines: [
      {
        name: "Ibuprofen",
        brand: "Advil, Motrin",
        otcStatus: true,
        details: {
          effectiveness: "Very effective for menstrual pain",
          safetyLevel: "Moderate risk",
          dosage: "200-400mg every 4-6 hours",
          maxDose: "1200mg per day",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach irritation",
            "Start at first sign of pain",
            "Not for long-term use"
          ]
        }
      },
      {
        name: "Naproxen",
        brand: "Aleve",
        otcStatus: true,
        details: {
          effectiveness: "Long-lasting menstrual pain relief",
          safetyLevel: "Moderate risk",
          dosage: "220mg every 8-12 hours",
          maxDose: "660mg per day",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May increase bleeding",
            "Avoid if stomach sensitive",
            "Not for extended use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Use heating pad on abdomen",
      "Exercise gently",
      "Stay hydrated",
      "Avoid caffeine",
      "Try relaxation techniques",
      "Get adequate rest",
      "Consider dietary changes",
      "See doctor if pain is severe"
    ]
  },
  "ear pain": {
    description: "Pain or discomfort in or around the ear",
    medicines: [
      {
        name: "Antipyrine and Benzocaine Otic",
        brand: "Aurodex",
        otcStatus: true,
        details: {
          effectiveness: "Relieves ear pain and inflammation",
          safetyLevel: "Generally safe",
          dosage: "4 drops in affected ear 3-4 times daily",
          maxDose: "Do not exceed 4 applications per day",
          requiresPrescription: false,
          warnings: [
            "Not for perforated eardrum",
            "Warm drops before use",
            "Do not use longer than 4 days",
            "Keep water out of ears"
          ]
        }
      },
      {
        name: "Acetaminophen",
        brand: "Tylenol",
        otcStatus: true,
        details: {
          effectiveness: "Helps with ear pain",
          safetyLevel: "Generally safe",
          dosage: "500-1000mg every 4-6 hours",
          maxDose: "4000mg per day",
          requiresPrescription: false,
          warnings: [
            "Temporary relief only",
            "See doctor if fever present",
            "Not for long-term use",
            "Avoid alcohol"
          ]
        }
      }
    ],
    generalAdvice: [
      "Keep ear dry",
      "Use warm compress",
      "Avoid swimming",
      "Sleep with affected ear up",
      "Don't insert objects in ear",
      "See doctor if symptoms persist",
      "Watch for fever or discharge"
    ]
  },
  "vertigo": {
    description: "Sensation of spinning or dizziness, affecting balance",
    medicines: [
      {
        name: "Meclizine",
        brand: "Antivert, Bonine",
        otcStatus: true,
        details: {
          effectiveness: "Effective for vertigo and dizziness",
          safetyLevel: "Generally safe",
          dosage: "25-50mg every 4-6 hours",
          maxDose: "100mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Avoid driving until effects are known",
            "Don't combine with alcohol",
            "Not for long-term use without consultation"
          ]
        }
      },
      {
        name: "Dimenhydrinate",
        brand: "Dramamine",
        otcStatus: true,
        details: {
          effectiveness: "Helps with vertigo symptoms",
          safetyLevel: "Generally safe",
          dosage: "50-100mg every 4-6 hours",
          maxDose: "400mg per day",
          requiresPrescription: false,
          warnings: [
            "Causes drowsiness",
            "Avoid operating machinery",
            "May cause dry mouth",
            "Not for children under 12"
          ]
        }
      }
    ],
    generalAdvice: [
      "Sit or lie down when symptoms occur",
      "Avoid sudden head movements",
      "Keep eyes fixed on a stationary object",
      "Stay hydrated",
      "Get adequate sleep",
      "Consider vestibular rehabilitation therapy",
      "See doctor if symptoms persist"
    ]
  },
  "acne": {
    description: "Skin condition causing pimples, blackheads, and inflammation",
    medicines: [
      {
        name: "Benzoyl Peroxide",
        brand: "Clean & Clear, Clearasil",
        otcStatus: true,
        details: {
          effectiveness: "Effective for mild to moderate acne",
          safetyLevel: "Generally safe",
          dosage: "Apply 2.5-5% gel once or twice daily",
          maxDose: "Use up to twice daily",
          requiresPrescription: false,
          warnings: [
            "May bleach fabrics",
            "Start with lower concentration",
            "Can cause skin dryness",
            "Avoid contact with eyes"
          ]
        }
      },
      {
        name: "Salicylic Acid",
        brand: "Stridex, Neutrogena",
        otcStatus: true,
        details: {
          effectiveness: "Good for preventing breakouts",
          safetyLevel: "Very safe",
          dosage: "Use 0.5-2% solution 1-3 times daily",
          maxDose: "3 applications per day",
          requiresPrescription: false,
          warnings: [
            "May cause mild stinging",
            "Avoid broken skin",
            "Use sunscreen during day",
            "Stop if irritation occurs"
          ]
        }
      }
    ],
    generalAdvice: [
      "Wash face twice daily",
      "Don't pop pimples",
      "Use non-comedogenic products",
      "Change pillowcase regularly",
      "Stay hydrated",
      "Avoid touching face frequently",
      "Consider dietary triggers"
    ]
  },
  "sinus congestion": {
    description: "Blockage or inflammation of nasal and sinus passages",
    medicines: [
      {
        name: "Pseudoephedrine",
        brand: "Sudafed",
        otcStatus: true,
        details: {
          effectiveness: "Effective decongestant",
          safetyLevel: "Moderate risk",
          dosage: "60mg every 4-6 hours",
          maxDose: "240mg per day",
          requiresPrescription: false,
          warnings: [
            "May increase blood pressure",
            "Avoid if heart conditions",
            "Can cause insomnia",
            "Not for extended use"
          ]
        }
      },
      {
        name: "Saline Nasal Spray",
        brand: "Ocean, Simply Saline",
        otcStatus: true,
        details: {
          effectiveness: "Safe for long-term use",
          safetyLevel: "Very safe",
          dosage: "1-2 sprays per nostril as needed",
          maxDose: "Use as needed",
          requiresPrescription: false,
          warnings: [
            "Clean nozzle after use",
            "Don't share with others",
            "Replace bottle monthly",
            "Use filtered water if making solution"
          ]
        }
      }
    ],
    generalAdvice: [
      "Use humidifier",
      "Stay hydrated",
      "Try nasal irrigation",
      "Elevate head while sleeping",
      "Avoid irritants",
      "Apply warm compress",
      "Consider steam inhalation"
    ]
  },
  "joint stiffness": {
    description: "Reduced mobility and discomfort in joints",
    medicines: [
      {
        name: "Glucosamine",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help with joint health",
          safetyLevel: "Very safe",
          dosage: "1500mg daily",
          maxDose: "1500mg per day",
          requiresPrescription: false,
          warnings: [
            "Takes weeks to show effect",
            "May affect blood sugar",
            "Consult if shellfish allergy",
            "Not for pregnant women"
          ]
        }
      },
      {
        name: "Topical Capsaicin",
        brand: "Zostrix, Capsagel",
        otcStatus: true,
        details: {
          effectiveness: "Provides temporary relief",
          safetyLevel: "Generally safe",
          dosage: "Apply 3-4 times daily",
          maxDose: "4 applications per day",
          requiresPrescription: false,
          warnings: [
            "May cause burning sensation",
            "Wash hands after use",
            "Avoid contact with eyes",
            "Don't use on broken skin"
          ]
        }
      }
    ],
    generalAdvice: [
      "Do gentle stretching exercises",
      "Apply heat before activity",
      "Use cold for inflammation",
      "Maintain healthy weight",
      "Stay active within limits",
      "Consider physical therapy",
      "Use ergonomic tools and furniture"
    ]
  },
  "indigestion": {
    description: "Discomfort or burning sensation in the upper abdomen",
    medicines: [
      {
        name: "Famotidine",
        brand: "Pepcid",
        otcStatus: true,
        details: {
          effectiveness: "Reduces stomach acid production",
          safetyLevel: "Generally safe",
          dosage: "20mg up to twice daily",
          maxDose: "40mg per day",
          requiresPrescription: false,
          warnings: [
            "Take 30 minutes before meals",
            "Not for long-term use",
            "May interact with other medications",
            "Consult doctor if pregnant"
          ]
        }
      },
      {
        name: "Calcium Carbonate",
        brand: "Tums, Rolaids",
        otcStatus: true,
        details: {
          effectiveness: "Quick relief for acid symptoms",
          safetyLevel: "Very safe",
          dosage: "500-1000mg as needed",
          maxDose: "7000mg per day",
          requiresPrescription: false,
          warnings: [
            "Space out from other medications",
            "May cause constipation",
            "Avoid if kidney stones",
            "Not for long-term use"
          ]
        }
      }
    ],
    generalAdvice: [
      "Eat smaller meals",
      "Avoid trigger foods",
      "Don't lie down after eating",
      "Maintain healthy weight",
      "Wear loose clothing",
      "Reduce stress",
      "Quit smoking if applicable"
    ]
  },
  "dry eyes": {
    description: "Insufficient lubrication of the eyes causing discomfort",
    medicines: [
      {
        name: "Carboxymethylcellulose",
        brand: "Refresh Tears, TheraTears",
        otcStatus: true,
        details: {
          effectiveness: "Long-lasting lubrication",
          safetyLevel: "Very safe",
          dosage: "1-2 drops as needed",
          maxDose: "Use up to 4 times daily or as needed",
          requiresPrescription: false,
          warnings: [
            "Remove contact lenses",
            "Don't touch tip to eye",
            "Discard after 3 months",
            "Wait 5 minutes between eye drops"
          ]
        }
      },
      {
        name: "Mineral Oil/White Petrolatum",
        brand: "Refresh PM",
        otcStatus: true,
        details: {
          effectiveness: "Overnight relief for dry eyes",
          safetyLevel: "Generally safe",
          dosage: "Small amount in lower eyelid at bedtime",
          maxDose: "Once daily at bedtime",
          requiresPrescription: false,
          warnings: [
            "May cause temporary blurred vision",
            "Use only at bedtime",
            "Not for contact lens wearers",
            "Avoid getting in mouth"
          ]
        }
      }
    ],
    generalAdvice: [
      "Take screen breaks",
      "Use a humidifier",
      "Protect eyes from wind",
      "Stay hydrated",
      "Consider omega-3 supplements",
      "Avoid smoky environments",
      "Regular eye check-ups"
    ]
  },
  "mouth ulcers": {
    description: "Small, painful sores inside the mouth",
    medicines: [
      {
        name: "Benzocaine",
        brand: "Orajel, Anbesol",
        otcStatus: true,
        details: {
          effectiveness: "Temporary pain relief",
          safetyLevel: "Generally safe",
          dosage: "Apply to ulcer up to 4 times daily",
          maxDose: "4 applications per day",
          requiresPrescription: false,
          warnings: [
            "Temporary numbness",
            "Don't eat while numb",
            "Not for children under 2",
            "Avoid swallowing"
          ]
        }
      },
      {
        name: "Hydrogen Peroxide Rinse",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps clean and heal ulcers",
          safetyLevel: "Safe when diluted",
          dosage: "Rinse with 1:1 dilution with water",
          maxDose: "3 times daily",
          requiresPrescription: false,
          warnings: [
            "Don't swallow solution",
            "Use only diluted",
            "Not for long-term use",
            "Stop if irritation occurs"
          ]
        }
      }
    ],
    generalAdvice: [
      "Avoid spicy foods",
      "Use soft-bristled toothbrush",
      "Rinse with salt water",
      "Identify trigger foods",
      "Maintain good oral hygiene",
      "Stay hydrated",
      "See dentist if persistent"
    ]
  },
  "leg swelling": {
    description: "Fluid accumulation causing enlarged legs or ankles",
    medicines: [
      {
        name: "Compression Stockings",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps reduce swelling",
          safetyLevel: "Very safe",
          dosage: "Wear during daytime",
          maxDose: "Remove at night",
          requiresPrescription: false,
          warnings: [
            "Proper sizing important",
            "Remove if numbness occurs",
            "Don't wear while sleeping",
            "Check skin regularly"
          ]
        }
      },
      {
        name: "Magnesium Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help reduce fluid retention",
          safetyLevel: "Generally safe",
          dosage: "200-400mg daily",
          maxDose: "400mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause digestive issues",
            "Start with lower dose",
            "Take with food",
            "Check with doctor if on medications"
          ]
        }
      }
    ],
    generalAdvice: [
      "Elevate legs when resting",
      "Exercise regularly",
      "Reduce salt intake",
      "Stay hydrated",
      "Avoid sitting/standing too long",
      "Maintain healthy weight",
      "See doctor if persistent"
    ]
  },
  "asthma": {
    description: "Breathing condition causing airway inflammation and difficulty breathing",
    medicines: [
      {
        name: "Albuterol",
        brand: "Ventolin, ProAir",
        otcStatus: false,
        details: {
          effectiveness: "Quick relief for asthma symptoms",
          safetyLevel: "Generally safe with prescription",
          dosage: "1-2 puffs every 4-6 hours as needed",
          maxDose: "8 puffs per day",
          requiresPrescription: true,
          warnings: [
            "May cause tremors",
            "Can increase heart rate",
            "Use spacer device if provided",
            "Seek emergency care if relief not achieved"
          ]
        }
      },
      {
        name: "Montelukast",
        brand: "Singulair",
        otcStatus: false,
        details: {
          effectiveness: "Long-term asthma control",
          safetyLevel: "Requires monitoring",
          dosage: "10mg once daily",
          maxDose: "10mg per day",
          requiresPrescription: true,
          warnings: [
            "Take in evening",
            "May affect mood",
            "Report behavioral changes",
            "Continue even when feeling well"
          ]
        }
      }
    ],
    generalAdvice: [
      "Follow asthma action plan",
      "Avoid known triggers",
      "Keep rescue inhaler nearby",
      "Monitor peak flow readings",
      "Get annual flu vaccine",
      "Keep environment dust-free",
      "Exercise with caution"
    ]
  },
  "urinary tract infection": {
    description: "Infection in any part of the urinary system, most commonly in the bladder",
    medicines: [
      {
        name: "Phenazopyridine",
        brand: "Pyridium, AZO",
        otcStatus: true,
        details: {
          effectiveness: "Relieves urinary pain and discomfort",
          safetyLevel: "Generally safe",
          dosage: "100-200mg three times daily",
          maxDose: "600mg per day",
          requiresPrescription: false,
          warnings: [
            "May discolor urine orange/red",
            "Take with food",
            "Short-term use only",
            "Not a cure for infection"
          ]
        }
      },
      {
        name: "Cranberry Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help prevent UTIs",
          safetyLevel: "Very safe",
          dosage: "300-400mg twice daily",
          maxDose: "1000mg per day",
          requiresPrescription: false,
          warnings: [
            "May interact with blood thinners",
            "Not a substitute for antibiotics",
            "Consult doctor if pregnant",
            "May affect blood sugar"
          ]
        }
      }
    ],
    generalAdvice: [
      "Drink plenty of water",
      "Urinate frequently",
      "Wipe from front to back",
      "Empty bladder after intercourse",
      "See doctor if symptoms persist",
      "Complete full course of antibiotics if prescribed",
      "Avoid holding urine"
    ]
  },
  "gout": {
    description: "Form of arthritis causing sudden, severe joint pain and inflammation",
    medicines: [
      {
        name: "Colchicine",
        brand: "Colcrys",
        otcStatus: false,
        details: {
          effectiveness: "Effective for acute gout attacks",
          safetyLevel: "Requires careful dosing",
          dosage: "As prescribed by doctor",
          maxDose: "Follow prescription strictly",
          requiresPrescription: true,
          warnings: [
            "Can cause severe diarrhea",
            "Interact with many medications",
            "Avoid grapefruit juice",
            "Report unusual bleeding"
          ]
        }
      },
      {
        name: "Cherry Extract",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help reduce gout attacks",
          safetyLevel: "Very safe",
          dosage: "1000mg daily",
          maxDose: "2000mg per day",
          requiresPrescription: false,
          warnings: [
            "Not a substitute for medication",
            "May affect blood sugar",
            "Consult doctor if on medications",
            "Store in cool, dry place"
          ]
        }
      }
    ],
    generalAdvice: [
      "Limit high-purine foods",
      "Stay hydrated",
      "Maintain healthy weight",
      "Avoid alcohol",
      "Regular exercise",
      "Take medications as prescribed",
      "Keep affected joint elevated"
    ]
  },
  "tinnitus": {
    description: "Ringing or buzzing noise in one or both ears",
    medicines: [
      {
        name: "Ginkgo Biloba",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help reduce tinnitus symptoms",
          safetyLevel: "Generally safe",
          dosage: "120-240mg daily",
          maxDose: "240mg per day",
          requiresPrescription: false,
          warnings: [
            "May increase bleeding risk",
            "Stop before surgery",
            "Interact with medications",
            "Not for pregnant women"
          ]
        }
      },
      {
        name: "Zinc Supplements",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help if zinc deficient",
          safetyLevel: "Safe in recommended doses",
          dosage: "25-50mg daily",
          maxDose: "50mg per day",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause nausea",
            "Long-term use needs monitoring",
            "Can interfere with other minerals"
          ]
        }
      }
    ],
    generalAdvice: [
      "Avoid loud noises",
      "Use white noise machines",
      "Practice stress reduction",
      "Protect ears from loud sounds",
      "Consider hearing aids if recommended",
      "Get adequate sleep",
      "Limit caffeine and alcohol"
    ]
  },
  "bronchitis": {
    description: "Inflammation of the bronchial tubes causing cough and mucus production",
    medicines: [
      {
        name: "Guaifenesin",
        brand: "Mucinex, Robitussin",
        otcStatus: true,
        details: {
          effectiveness: "Helps loosen and thin mucus",
          safetyLevel: "Very safe",
          dosage: "200-400mg every 4 hours",
          maxDose: "2400mg per day",
          requiresPrescription: false,
          warnings: [
            "Drink plenty of water",
            "May cause nausea",
            "Not for chronic bronchitis without consultation",
            "Stop use if cough persists over 7 days"
          ]
        }
      },
      {
        name: "Dextromethorphan",
        brand: "Delsym, Robitussin DM",
        otcStatus: true,
        details: {
          effectiveness: "Suppresses cough",
          safetyLevel: "Generally safe",
          dosage: "10-20mg every 4 hours",
          maxDose: "120mg per day",
          requiresPrescription: false,
          warnings: [
            "May cause drowsiness",
            "Don't use with MAO inhibitors",
            "Not for productive coughs",
            "Avoid alcohol"
          ]
        }
      }
    ],
    generalAdvice: [
      "Rest and stay hydrated",
      "Use a humidifier",
      "Avoid smoking and secondhand smoke",
      "Practice good hand hygiene",
      "Consider steam inhalation",
      "Get plenty of sleep",
      "See doctor if symptoms worsen or fever develops"
    ]
  },
  "varicose veins": {
    description: "Enlarged, twisted veins, usually appearing in legs",
    medicines: [
      {
        name: "Horse Chestnut Extract",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "May help reduce swelling and discomfort",
          safetyLevel: "Generally safe",
          dosage: "250-300mg twice daily",
          maxDose: "600mg per day",
          requiresPrescription: false,
          warnings: [
            "Not for pregnant women",
            "May interact with blood thinners",
            "Stop use before surgery",
            "Consult doctor if diabetic"
          ]
        }
      },
      {
        name: "Compression Stockings",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps improve circulation",
          safetyLevel: "Very safe",
          dosage: "Wear during daytime",
          maxDose: "Remove at night",
          requiresPrescription: false,
          warnings: [
            "Ensure proper fitting",
            "Remove if circulation problems occur",
            "Replace every 3-6 months",
            "Don't wear while sleeping"
          ]
        }
      }
    ],
    generalAdvice: [
      "Exercise regularly",
      "Elevate legs when resting",
      "Avoid standing for long periods",
      "Maintain healthy weight",
      "Wear loose-fitting clothes",
      "Consider support stockings",
      "See doctor if pain or swelling increases"
    ]
  },
  "psoriasis": {
    description: "Chronic skin condition causing red, scaly patches",
    medicines: [
      {
        name: "Coal Tar",
        brand: "MG217, Psoriasin",
        otcStatus: true,
        details: {
          effectiveness: "Reduces scaling and inflammation",
          safetyLevel: "Generally safe",
          dosage: "Apply 1-2 times daily",
          maxDose: "2 applications per day",
          requiresPrescription: false,
          warnings: [
            "May stain clothing",
            "Increased sun sensitivity",
            "Not for broken skin",
            "Stop if irritation occurs"
          ]
        }
      },
      {
        name: "Salicylic Acid",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps remove scales",
          safetyLevel: "Generally safe",
          dosage: "Apply as directed on product",
          maxDose: "Follow package instructions",
          requiresPrescription: false,
          warnings: [
            "May cause skin irritation",
            "Don't use on large areas",
            "Avoid open wounds",
            "Keep away from eyes"
          ]
        }
      }
    ],
    generalAdvice: [
      "Keep skin moisturized",
      "Get some sun exposure (carefully)",
      "Avoid skin injury",
      "Manage stress levels",
      "Use gentle skincare products",
      "Consider dietary changes",
      "Join support groups"
    ]
  },
  "carpal tunnel": {
    description: "Pressure on median nerve causing hand and wrist pain",
    medicines: [
      {
        name: "Naproxen",
        brand: "Aleve",
        otcStatus: true,
        details: {
          effectiveness: "Reduces pain and inflammation",
          safetyLevel: "Moderate risk",
          dosage: "220-440mg every 8-12 hours",
          maxDose: "660mg per day",
          requiresPrescription: false,
          warnings: [
            "Take with food",
            "May cause stomach issues",
            "Not for long-term use",
            "Avoid if heart problems"
          ]
        }
      },
      {
        name: "Wrist Brace",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Helps reduce pressure on nerve",
          safetyLevel: "Very safe",
          dosage: "Wear at night or during activities",
          maxDose: "As needed",
          requiresPrescription: false,
          warnings: [
            "Ensure proper fit",
            "Don't wear too tight",
            "Clean regularly",
            "Replace when worn out"
          ]
        }
      }
    ],
    generalAdvice: [
      "Take frequent breaks from repetitive tasks",
      "Practice wrist exercises",
      "Maintain good posture",
      "Use ergonomic equipment",
      "Apply ice for pain",
      "Consider workplace modifications",
      "See doctor if symptoms persist"
    ]
  },
  "food poisoning": {
    description: "Illness caused by consuming contaminated food or drinks",
    medicines: [
      {
        name: "Bismuth Subsalicylate",
        brand: "Pepto-Bismol, Kaopectate",
        otcStatus: true,
        details: {
          effectiveness: "Relieves multiple symptoms",
          safetyLevel: "Generally safe",
          dosage: "30ml or 2 tablets every hour",
          maxDose: "8 doses per day",
          requiresPrescription: false,
          warnings: [
            "May cause dark stools",
            "Not for aspirin-sensitive people",
            "Avoid if bleeding disorders",
            "Stop use if symptoms worsen"
          ]
        }
      },
      {
        name: "Loperamide",
        brand: "Imodium",
        otcStatus: true,
        details: {
          effectiveness: "Controls diarrhea",
          safetyLevel: "Generally safe",
          dosage: "4mg initially, then 2mg after each loose stool",
          maxDose: "8mg per day",
          requiresPrescription: false,
          warnings: [
            "Not for bloody diarrhea",
            "Stop if fever develops",
            "Not for children under 6",
            "Seek medical attention if severe"
          ]
        }
      }
    ],
    generalAdvice: [
      "Stay hydrated with clear fluids",
      "Rest and avoid solid foods initially",
      "Gradually introduce bland foods",
      "Monitor temperature",
      "Seek medical attention if severe symptoms",
      "Practice food safety in future",
      "Keep electrolytes balanced"
    ]
  },
  "burns": {
    description: "Skin damage caused by heat, chemicals, electricity, or radiation",
    medicines: [
      {
        name: "Silver Sulfadiazine",
        brand: "Silvadene",
        otcStatus: false,
        details: {
          effectiveness: "Prevents infection in burns",
          safetyLevel: "Requires prescription",
          dosage: "Apply thin layer 1-2 times daily",
          maxDose: "As prescribed",
          requiresPrescription: true,
          warnings: [
            "For external use only",
            "May stain clothing",
            "Not for face or eyes",
            "Report any allergic reactions"
          ]
        }
      },
      {
        name: "Bacitracin Zinc Ointment",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Prevents minor burn infection",
          safetyLevel: "Generally safe",
          dosage: "Apply thin layer 1-3 times daily",
          maxDose: "3 applications per day",
          requiresPrescription: false,
          warnings: [
            "For minor burns only",
            "Keep wound clean",
            "Stop if irritation occurs",
            "Not for severe burns"
          ]
        }
      }
    ],
    generalAdvice: [
      "Cool burn under running water",
      "Don't break blisters",
      "Keep burn clean and covered",
      "Avoid home remedies",
      "Seek immediate medical care for severe burns",
      "Watch for signs of infection",
      "Keep tetanus shot updated"
    ]
  },
  "hemorrhoids": {
    description: "Swollen veins in rectum and anus causing discomfort",
    medicines: [
      {
        name: "Hydrocortisone Cream",
        brand: "Preparation H, Anusol",
        otcStatus: true,
        details: {
          effectiveness: "Reduces inflammation and itching",
          safetyLevel: "Generally safe",
          dosage: "Apply up to 4 times daily",
          maxDose: "4 applications per day",
          requiresPrescription: false,
          warnings: [
            "External use only",
            "Not for long-term use",
            "Stop if bleeding occurs",
            "Consult doctor if no improvement"
          ]
        }
      },
      {
        name: "Witch Hazel Pads",
        brand: "Tucks, Preparation H",
        otcStatus: true,
        details: {
          effectiveness: "Provides cooling relief",
          safetyLevel: "Very safe",
          dosage: "Use after bowel movements",
          maxDose: "Up to 6 times daily",
          requiresPrescription: false,
          warnings: [
            "External use only",
            "Keep away from eyes",
            "Discontinue if irritation occurs",
            "Store in cool place"
          ]
        }
      }
    ],
    generalAdvice: [
      "Increase fiber intake",
      "Stay hydrated",
      "Avoid straining",
      "Take warm baths",
      "Keep area clean",
      "Exercise regularly",
      "See doctor if condition worsens"
    ]
  },
  "shingles": {
    description: "Viral infection causing painful skin rash with blisters",
    medicines: [
      {
        name: "Acyclovir",
        brand: "Zovirax",
        otcStatus: false,
        details: {
          effectiveness: "Antiviral medication",
          safetyLevel: "Requires monitoring",
          dosage: "As prescribed by doctor",
          maxDose: "Follow prescription",
          requiresPrescription: true,
          warnings: [
            "Start treatment early",
            "Complete full course",
            "Stay hydrated",
            "Report side effects"
          ]
        }
      },
      {
        name: "Calamine Lotion",
        brand: "Various brands",
        otcStatus: true,
        details: {
          effectiveness: "Relieves itching and discomfort",
          safetyLevel: "Very safe",
          dosage: "Apply to affected area as needed",
          maxDose: "Use as needed",
          requiresPrescription: false,
          warnings: [
            "External use only",
            "Avoid broken skin",
            "Keep away from eyes",
            "Stop if irritation occurs"
          ]
        }
      }
    ],
    generalAdvice: [
      "Keep rash clean and dry",
      "Wear loose clothing",
      "Avoid scratching",
      "Reduce stress",
      "Get plenty of rest",
      "Consider vaccination",
      "Seek early treatment"
    ]
  }
};

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [medicineInfo, setMedicineInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [theme, setTheme] = useState('light')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [language, setLanguage] = useState('en')
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [comparedMedicines, setComparedMedicines] = useState([])
  const [schedules, setSchedules] = useState([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedSymptom, setSelectedSymptom] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  // Add new state for About modal
  const [showAbout, setShowAbout] = useState(false)

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Add to recent searches
    setRecentSearches(prev => {
      const updated = [searchQuery.toLowerCase(), ...prev.filter(s => s !== searchQuery.toLowerCase())]
      return updated.slice(0, 5)
    })

    // Map alternative terms to their main symptom key
    const symptomMap = {
      'stomach pain': 'stomachache',
      'belly pain': 'stomachache',
      'abdominal pain': 'stomachache',
      'stomach ache': 'stomachache',
      'tummy pain': 'stomachache',
      'tummy ache': 'stomachache',
      'belly ache': 'stomachache',
      'head ache': 'headache',
      'head pain': 'headache',
      'migraine': 'headache',
      'head pressure': 'headache',
      'tension headache': 'headache',
      'sinus headache': 'headache',
      'bp': 'high blood pressure',
      'high bp': 'high blood pressure',
      'hypertension': 'high blood pressure',
      'elevated bp': 'high blood pressure',
      'elevated blood pressure': 'high blood pressure',
      'low bp': 'low blood pressure',
      'hypotension': 'low blood pressure',
      'decreased bp': 'low blood pressure',
      'decreased blood pressure': 'low blood pressure',
      'blood pressure high': 'high blood pressure',
      'blood pressure low': 'low blood pressure',
      'bone pain': 'bone pain',
      'joint pain': 'bone pain',
      'bone ache': 'bone pain',
      'skeletal pain': 'bone pain',
      'bone and joint pain': 'bone pain',
      'arthritis pain': 'bone pain',
      'joint ache': 'bone pain',
      'muscle and bone pain': 'bone pain',
      'body ache': 'bone pain',
      'body pain': 'bone pain',
      'cant sleep': 'insomnia',
      'difficulty sleeping': 'insomnia',
      'sleep problems': 'insomnia',
      'sleeplessness': 'insomnia',
      'throat pain': 'sore throat',
      'strep throat': 'sore throat',
      'throat infection': 'sore throat',
      'scratchy throat': 'sore throat',
      'hay fever': 'allergies',
      'seasonal allergies': 'allergies',
      'allergy symptoms': 'allergies',
      'runny nose': 'allergies',
      'loose motions': 'diarrhea',
      'loose stools': 'diarrhea',
      'stomach flu': 'diarrhea',
      'feeling sick': 'nausea',
      'want to vomit': 'nausea',
      'motion sickness': 'nausea',
      'morning sickness': 'nausea',
      'lower back pain': 'back pain',
      'upper back pain': 'back pain',
      'backache': 'back pain',
      'spinal pain': 'back pain',
      'nervous': 'anxiety',
      'panic': 'anxiety',
      'stress': 'anxiety',
      'worried': 'anxiety',
      'panic attack': 'anxiety',
      'skin irritation': 'skin rash',
      'itchy skin': 'skin rash',
      'skin allergy': 'skin rash',
      'dermatitis': 'skin rash',
      'skin inflammation': 'skin rash',
      'tooth pain': 'toothache',
      'dental pain': 'toothache',
      'tooth ache': 'toothache',
      'jaw pain': 'toothache',
      'eye pain': 'eye irritation',
      'red eyes': 'eye irritation',
      'dry eyes': 'eye irritation',
      'itchy eyes': 'eye irritation',
      'leg cramps': 'muscle cramps',
      'muscle pain': 'muscle cramps',
      'muscle spasms': 'muscle cramps',
      'night cramps': 'muscle cramps',
      'car sickness': 'motion sickness',
      'sea sickness': 'motion sickness',
      'travel sickness': 'motion sickness',
      'vertigo': 'motion sickness',
      'cant poop': 'constipation',
      'hard stools': 'constipation',
      'irregular bowel': 'constipation',
      'difficult bowel movement': 'constipation',
      'sun burn': 'sunburn',
      'sun damage': 'sunburn',
      'burned skin': 'sunburn',
      'sun exposure': 'sunburn',
      'period pain': 'menstrual cramps',
      'period cramps': 'menstrual cramps',
      'menstrual pain': 'menstrual cramps',
      'dysmenorrhea': 'menstrual cramps',
      'earache': 'ear pain',
      'ear infection': 'ear pain',
      'ear discomfort': 'ear pain',
      'ear inflammation': 'ear pain',
      'dizzy': 'vertigo',
      'spinning sensation': 'vertigo',
      'balance problems': 'vertigo',
      'dizziness': 'vertigo',
      'pimples': 'acne',
      'breakouts': 'acne',
      'zits': 'acne',
      'facial acne': 'acne',
      'blocked nose': 'sinus congestion',
      'stuffy nose': 'sinus congestion',
      'nasal congestion': 'sinus congestion',
      'sinusitis': 'sinus congestion',
      'stiff joints': 'joint stiffness',
      'arthritis': 'joint stiffness',
      'morning stiffness': 'joint stiffness',
      'joint pain and stiffness': 'joint stiffness',
      'heartburn': 'indigestion',
      'acid reflux': 'indigestion',
      'upset stomach': 'indigestion',
      'dyspepsia': 'indigestion',
      'burning eyes': 'dry eyes',
      'eye dryness': 'dry eyes',
      'gritty eyes': 'dry eyes',
      'eye discomfort': 'dry eyes',
      'canker sores': 'mouth ulcers',
      'oral ulcers': 'mouth ulcers',
      'mouth sores': 'mouth ulcers',
      'aphthous ulcers': 'mouth ulcers',
      'swollen legs': 'leg swelling',
      'ankle swelling': 'leg swelling',
      'fluid retention': 'leg swelling',
      'edema': 'leg swelling',
      'puffy ankles': 'leg swelling',
      'breathing problems': 'asthma',
      'wheezing': 'asthma',
      'shortness of breath': 'asthma',
      'difficulty breathing': 'asthma',
      'chest tightness': 'asthma',
      'uti': 'urinary tract infection',
      'bladder infection': 'urinary tract infection',
      'painful urination': 'urinary tract infection',
      'frequent urination': 'urinary tract infection',
      'burning sensation': 'urinary tract infection',
      'joint inflammation': 'gout',
      'gouty arthritis': 'gout',
      'podagra': 'gout',
      'uric acid': 'gout',
      'joint swelling': 'gout',
      'ear ringing': 'tinnitus',
      'ear buzzing': 'tinnitus',
      'ear noise': 'tinnitus',
      'hearing problems': 'tinnitus',
      'ear sounds': 'tinnitus',
      'chest congestion': 'bronchitis',
      'chronic cough': 'bronchitis',
      'productive cough': 'bronchitis',
      'bronchial infection': 'bronchitis',
      'spider veins': 'varicose veins',
      'vein problems': 'varicose veins',
      'leg veins': 'varicose veins',
      'venous insufficiency': 'varicose veins',
      'skin patches': 'psoriasis',
      'scalp psoriasis': 'psoriasis',
      'plaque psoriasis': 'psoriasis',
      'scaly skin': 'psoriasis',
      'wrist pain': 'carpal tunnel',
      'hand numbness': 'carpal tunnel',
      'finger tingling': 'carpal tunnel',
      'repetitive strain': 'carpal tunnel',
      'typing pain': 'carpal tunnel',
      'food sickness': 'food poisoning',
      'stomach bug': 'food poisoning',
      'gastroenteritis': 'food poisoning',
      'food contamination': 'food poisoning',
      'burn wound': 'burns',
      'skin burn': 'burns',
      'thermal burn': 'burns',
      'chemical burn': 'burns',
      'piles': 'hemorrhoids',
      'rectal pain': 'hemorrhoids',
      'anal discomfort': 'hemorrhoids',
      'rectal bleeding': 'hemorrhoids',
      'herpes zoster': 'shingles',
      'zoster': 'shingles',
      'nerve pain': 'shingles',
      'postherpetic neuralgia': 'shingles'
    }

    // Check if the search term is an alternative name and get the standardized key
    const symptomKey = symptomMap[searchQuery.toLowerCase()] || searchQuery.toLowerCase()
    
    // Search in symptoms database
    const results = symptomsDatabase[symptomKey]
    if (results) {
      setSelectedSymptom(searchQuery.toLowerCase())
      setSearchResults(results)
    } else {
      addNotification('No information found for this symptom. Try searching for "blood pressure", "headache", "fever", "cold", or "cough".')
    }
    setIsLoading(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    addNotification(`Language changed to ${lang === 'en' ? 'English' : 'Español'}`)
  }

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message
    }
    setNotifications(prev => [newNotification, ...prev])
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const ScheduleModal = ({ onClose, onSave }) => {
    const [schedule, setSchedule] = useState({
      medicine: '',
      dosage: '',
      frequency: 'daily',
      time: '',
      notes: ''
    })

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Add Medication Schedule</h3>
          <form onSubmit={(e) => {
            e.preventDefault()
            onSave(schedule)
            onClose()
          }}>
            <input
              type="text"
              placeholder="Medicine Name"
              value={schedule.medicine}
              onChange={(e) => setSchedule({...schedule, medicine: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Dosage"
              value={schedule.dosage}
              onChange={(e) => setSchedule({...schedule, dosage: e.target.value})}
              required
            />
            <select
              value={schedule.frequency}
              onChange={(e) => setSchedule({...schedule, frequency: e.target.value})}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <input
              type="time"
              value={schedule.time}
              onChange={(e) => setSchedule({...schedule, time: e.target.value})}
              required
            />
            <textarea
              placeholder="Additional Notes"
              value={schedule.notes}
              onChange={(e) => setSchedule({...schedule, notes: e.target.value})}
            />
            <div className="modal-actions">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save Schedule</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Add this new component for displaying medicine recommendations
  const MedicineRecommendations = ({ symptom, results }) => (
    <section className="symptom-results">
      <div className="symptom-header">
        <h2>Recommendations for {symptom}</h2>
        <p className="symptom-description">{results.description}</p>
      </div>

      <div className="recommendations-grid">
        <div className="otc-medicines">
          <h3>Over-the-Counter Medicines</h3>
          <div className="medicines-list">
            {results.medicines
              .filter(med => med.otcStatus)
              .map(medicine => (
                <div key={medicine.name} className="medicine-card">
                  <h4>{medicine.name}</h4>
                  <p className="brand-names">Available as: {medicine.brand}</p>
                  <div className="medicine-details">
                    <p><strong>Dosage:</strong> {medicine.details.dosage}</p>
                    <p><strong>Maximum:</strong> {medicine.details.maxDose}</p>
                    <p><strong>Safety Level:</strong> {medicine.details.safetyLevel}</p>
                    <div className="warnings">
                      <h5>Important Warnings:</h5>
                      <ul>
                        {medicine.details.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="prescription-medicines">
          <h3>Prescription Medicines</h3>
          <div className="medicines-list">
            {results.medicines
              .filter(med => !med.otcStatus)
              .map(medicine => (
                <div key={medicine.name} className="medicine-card prescription">
                  <div className="prescription-badge">Requires Prescription</div>
                  <h4>{medicine.name}</h4>
                  <p className="brand-names">Available as: {medicine.brand}</p>
                  <div className="medicine-details">
                    <p><strong>Safety Level:</strong> {medicine.details.safetyLevel}</p>
                    <div className="warnings">
                      <h5>Important Warnings:</h5>
                      <ul>
                        {medicine.details.warnings.map((warning, idx) => (
                          <li key={idx}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="general-advice">
        <h3>General Advice</h3>
        <ul>
          {results.generalAdvice.map((advice, idx) => (
            <li key={idx}>{advice}</li>
          ))}
        </ul>
      </div>
    </section>
  )

  // Add new component for About modal
  const AboutModal = () => {
    const symptoms = Object.keys(symptomsDatabase);
    
    // Group symptoms by category for better organization
    const categories = {
      "Common Conditions": ["fever", "cold", "headache", "cough", "stomachache"],
      "Cardiovascular": ["high blood pressure", "low blood pressure"],
      "Pain & Inflammation": ["bone pain", "joint stiffness", "back pain", "carpal tunnel"],
      "Digestive Issues": ["indigestion", "food poisoning", "constipation", "diarrhea"],
      "Respiratory": ["asthma", "bronchitis", "sinus congestion"],
      "Skin Conditions": ["psoriasis", "acne", "sunburn", "skin rash"],
      "Neurological": ["vertigo", "anxiety", "insomnia"],
      "Others": ["dry eyes", "mouth ulcers", "hemorrhoids", "tinnitus", "varicose veins"]
    };

    return (
      <div className="modal-overlay" onClick={(e) => {
        if (e.target.className === 'modal-overlay') {
          setShowAbout(false);
        }
      }}>
        <div className="about-modal">
          <div className="about-header">
            <h2>Symptoms Guide</h2>
            <button className="close-button" onClick={() => setShowAbout(false)}>×</button>
          </div>
          
          <div className="about-content">
            <p className="about-description">
              Explore our comprehensive database of medical symptoms and conditions. 
              Click on any symptom to learn about treatments, medications, and general advice.
            </p>
            
            <div className="categories-container">
              {Object.entries(categories).map(([category, categorySymptoms]) => (
                <div key={category} className="category-section">
                  <h3 className="category-title">{category}</h3>
                  <div className="symptoms-grid">
                    {categorySymptoms.map(symptom => (
                      symptoms.includes(symptom) && (
                        <div key={symptom} className="symptom-card" 
                             onClick={() => {
                               setShowAbout(false);
                               // Trigger search for this symptom
                               handleSearch({ target: { value: symptom } });
                             }}>
                          <h4 className="symptom-name">
                            {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                          </h4>
                          <p className="symptom-description">
                            {symptomsDatabase[symptom].description}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`pharmainfo-app ${theme}`}>
      <nav className="top-nav">
        <div className="nav-content">
          <div className="nav-left">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <select 
              className="language-select"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="nav-links">
            <button onClick={() => setShowAbout(true)}>About</button>
            <a href="#contact">Contact</a>
            <a href="#help">Help</a>
          </div>
        </div>
      </nav>

      {/* Add the About modal */}
      {showAbout && <AboutModal />}

      <div className={`notification ${showNotification ? 'show' : ''}`}>
        {notifications[0]?.message}
      </div>

      <header>
        <h1>PharmaInfo</h1>
        <p>Your Trusted Medicine Information Guide</p>
      </header>

      <main>
        <section className="search-section">
          <form onSubmit={handleSearch}>
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter symptom (e.g., fever, cold, headache)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className={`search-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !searchQuery.trim()}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
          
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <h3>Recent Searches</h3>
              <div className="search-tags">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="search-tag"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {searchResults && (
          <MedicineRecommendations 
            symptom={selectedSymptom} 
            results={searchResults}
          />
        )}

        {!medicineInfo && !isLoading && (
          <section className="welcome-message">
            <h2>Find Detailed Medicine Information</h2>
            <div className="features">
              <div className="feature">
                <span className="icon">💊</span>
                <p>Complete dosage guidelines</p>
              </div>
              <div className="feature">
                <span className="icon">⚠️</span>
                <p>Side effects & warnings</p>
              </div>
              <div className="feature">
                <span className="icon">🔄</span>
                <p>Drug interactions</p>
              </div>
              <div className="feature">
                <span className="icon">👶</span>
                <p>Age-specific information</p>
              </div>
            </div>
          </section>
        )}

        <section className="medicine-schedule">
          <h2>Medication Schedule</h2>
          <button 
            className="add-schedule-button"
            onClick={() => setShowScheduleModal(true)}
          >
            Add New Schedule
          </button>
          
          <div className="schedules-grid">
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-card">
                <h3>{schedule.medicine}</h3>
                <p><strong>Dosage:</strong> {schedule.dosage}</p>
                <p><strong>Frequency:</strong> {schedule.frequency}</p>
                <p><strong>Time:</strong> {schedule.time}</p>
                {schedule.notes && <p><strong>Notes:</strong> {schedule.notes}</p>}
                <button 
                  className="delete-schedule"
                  onClick={() => {
                    setSchedules(prev => prev.filter((_, i) => i !== index))
                    addNotification('Schedule removed')
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {showScheduleModal && (
            <ScheduleModal
              onClose={() => setShowScheduleModal(false)}
              onSave={(newSchedule) => {
                setSchedules(prev => [...prev, newSchedule])
                addNotification('New schedule added')
              }}
            />
          )}
        </section>

        {showScrollTop && (
          <button 
            className="scroll-top"
            onClick={scrollToTop}
          >
            ↑
          </button>
        )}
      </main>

      {comparedMedicines.length > 0 && (
        <section className="medicine-comparison">
          <h2>Medicine Comparison</h2>
          <div className="comparison-grid">
            {comparedMedicines.map(medicine => (
              <div key={medicine.name} className="comparison-card">
                <h3>{medicine.name}</h3>
                <p>{medicine.category}</p>
                <button 
                  className="remove-comparison"
                  onClick={() => {
                    setComparedMedicines(prev => 
                      prev.filter(m => m.name !== medicine.name)
                    )
                    addNotification('Medicine removed from comparison')
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About PharmaInfo</h3>
            <p>Providing reliable medicine information since 2024</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#twitter">Twitter</a>
              <a href="#facebook">Facebook</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <p className="disclaimer">Disclaimer: Always consult with a healthcare professional before taking any medication.</p>
        <p className="copyright">© 2024 PharmaInfo. For informational purposes only.</p>
      </footer>
    </div>
  )
}

export default App
