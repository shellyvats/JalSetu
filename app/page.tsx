"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase/client";
import { generatePDFReport } from "@/lib/pdf-generator"
import {
  Droplets,
  MapPin,
  Calculator,
  Download,
  Leaf,
  DollarSign,
  Shield,
  Smartphone,
  FileText,
  Eye,
  ArrowRight,
  TrendingUp,
  Users,
  Building,
  Phone,
  Mail,
  Zap,
  Cloud,
  BarChart3,
  Waves,
  TreePine,
  Home,
  Factory,
  School,
  Star,
  CheckCircle,
  Info,
  Lock,
  Unlock,
  MessageCircle,
  Bot,
  X,
  Send,
} from "lucide-react"

export default function JalSetuWebsite() {
  const [formData, setFormData] = useState({
    roofArea: "",
    roofMaterial: "concrete",
    buildingType: "residential",
    location: "",
    gpsCoords: "",
  })

  const [authData, setAuthData] = useState({
    phone: "",
    email: "",
    name: "",
    otp: "",
    isSignedIn: false,
    otpSent: false,
    otpVerified: false,
  })

  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const [showChat, setShowChat] = useState(false)
  const [chatLanguage, setChatLanguage] = useState("")
  const [chatInitialized, setChatInitialized] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  const initializeChat = (language: string) => {
    setChatLanguage(language)
    setChatInitialized(true)

    const greeting = authData.isSignedIn
      ? language === "hindi"
        ? `नमस्ते ${authData.name}! मैं JalSetu सहायक हूं। वर्षा जल संचयन के बारे में कोई भी प्रश्न पूछें।`
        : `Hello ${authData.name}! I'm JalSetu assistant. Ask me anything about rainwater harvesting.`
      : language === "hindi"
        ? "नमस्ते! मैं JalSetu सहायक हूं। वर्षा जल संचयन के बारे में कोई भी प्रश्न पूछें।"
        : "Hello! I'm JalSetu assistant. Ask me anything about rainwater harvesting."

    setChatMessages([{ type: "assistant", message: greeting }])
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    const newMessages = [...chatMessages, { type: "user", message: currentMessage }]
    setChatMessages(newMessages)

    setTimeout(() => {
      const chatContainer = document.getElementById("chat-messages")
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    }, 100)

    // Simulate assistant response
    setTimeout(() => {
      let response = ""
      const msg = currentMessage.toLowerCase()
      const isHindi = chatLanguage === "hindi"

      if (msg.includes("cost") || msg.includes("price") || msg.includes("लागत") || msg.includes("कीमत")) {
        response = isHindi
          ? "वर्षा जल संचयन सिस्टम की लागत आपकी छत के क्षेत्रफल पर निर्भर करती है। आमतौर पर ₹15,000 से ₹50,000 तक का खर्च आता है। सटीक अनुमान के लिए कैलकुलेटर का उपयोग करें।"
          : "Rainwater harvesting system cost depends on your roof area. Usually ranges from ₹15,000 to ₹50,000. Use our calculator for precise estimates."
      } else if (msg.includes("tank") || msg.includes("टैंक") || msg.includes("storage")) {
        response = isHindi
          ? "टैंक का साइज़ आपकी दैनिक पानी की आवश्यकता और बारिश के पैटर्न पर निर्भर करता है। आमतौर पर 1000-5000 लीटर की क्षमता वाले टैंक उपयुक्त होते हैं।"
          : "Tank size depends on your daily water needs and rainfall patterns. Usually 1000-5000 liter capacity tanks are suitable."
      } else if (msg.includes("maintenance") || msg.includes("रखरखाव") || msg.includes("care")) {
        response = isHindi
          ? "वर्षा जल संचयन सिस्टम का रखरखाव बहुत आसान है। साल में 2-3 बार फिल्टर की सफाई और टैंक की जांच करना पर्याप्त है।"
          : "Rainwater harvesting system maintenance is very easy. Cleaning filters and checking tanks 2-3 times a year is sufficient."
      } else if (msg.includes("engineer") || msg.includes("इंजीनियर") || msg.includes("contractor")) {
        response = isHindi
          ? "हमारे पास प्रमाणित इंजीनियरों की सूची है जो आपके क्षेत्र में काम करते हैं। कैलकुलेटर के परिणाम देखने के बाद आप उनसे संपर्क कर सकते हैं।"
          : "We have a list of certified engineers working in your area. You can contact them after viewing calculator results."
      } else if (msg.includes("benefit") || msg.includes("फायदे") || msg.includes("advantage")) {
        response = isHindi
          ? "वर्षा जल संचयन के मुख्य फायदे: पानी की बचत, भूजल स्तर में वृद्धि, बाढ़ नियंत्रण, और पानी के बिल में कमी। यह पर्यावरण के लिए भी अच्छा है।"
          : "Main benefits of rainwater harvesting: Water conservation, groundwater recharge, flood control, and reduced water bills. It's also great for the environment."
      } else {
        response = isHindi
          ? "मैं वर्षा जल संचयन के बारे में जानकारी दे सकता हूं। आप लागत, टैंक साइज़, रखरखाव, इंजीनियरों, या फायदों के बारे में पूछ सकते हैं। अधिक जानकारी के लिए हमारे कैलकुलेटर का उपयोग करें।"
          : "I can provide information about rainwater harvesting. You can ask about costs, tank sizes, maintenance, engineers, or benefits. Use our calculator for detailed information."
      }

      setChatMessages((prev) => [...prev, { type: "assistant", message: response }])

      setTimeout(() => {
        const chatContainer = document.getElementById("chat-messages")
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight
        }
      }, 100)
    }, 1000)

    setCurrentMessage("")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAuthChange = (field: string, value: string) => {
    setAuthData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendOTP = () => {
    if (authData.phone && authData.name) {
      // Simulate OTP sending
      setAuthData((prev) => ({ ...prev, otpSent: true }))
      // In real implementation, you would call an API to send OTP
      console.log("[v0] OTP sent to:", authData.phone)
    }
  }

  const handleVerifyOTP = () => {
    // Simulate OTP verification (in real app, verify with backend)
    if (authData.otp === "1234" || authData.otp.length === 6) {
      setAuthData((prev) => ({
        ...prev,
        isSignedIn: true,
        otpVerified: true,
      }))
      setShowAuth(false)
    }
  }

  const saveCalculationToDatabase = async (calculationResults: any) => {
    if (!authData.isSignedIn) return

    try {
      const response = await fetch("/api/save-calculation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          results: calculationResults,
          userData: {
            name: authData.name,
            email: authData.email,
            phone: authData.phone,
          },
        }),
      })

      const data = await response.json()

      if (data.success) {
        console.log("[v0] Calculation saved to database with ID:", data.calculationId)
      } else {
        console.error("[v0] Failed to save calculation:", data.error)
      }
    } catch (error) {
      console.error("[v0] Error saving calculation:", error)
    }
  }

  const handleCalculate = async () => {
    setIsCalculating(true)

    const area = Number.parseFloat(formData.roofArea) || 0
    const materialMultiplier =
      {
        concrete: 0.85,
        tiles: 0.8,
        metal: 0.9,
        others: 0.75,
      }[formData.roofMaterial] || 0.8

    const buildingMultiplier =
      {
        residential: 1.0,
        commercial: 1.2,
        industrial: 1.5,
        educational: 1.1,
      }[formData.buildingType] || 1.0

    // Enhanced location-based rainfall data with seasonal variations
    const locationData = {
      Mumbai: { avgRainfall: 2400, peakMonthly: 800, efficiency: 0.92 },
      Delhi: { avgRainfall: 800, peakMonthly: 180, efficiency: 0.88 },
      Chennai: { avgRainfall: 1200, peakMonthly: 350, efficiency: 0.9 },
      Bangalore: { avgRainfall: 900, peakMonthly: 200, efficiency: 0.89 },
      Pune: { avgRainfall: 650, peakMonthly: 150, efficiency: 0.87 },
      Hyderabad: { avgRainfall: 750, peakMonthly: 170, efficiency: 0.88 },
      Kolkata: { avgRainfall: 1600, peakMonthly: 400, efficiency: 0.91 },
      default: { avgRainfall: 1000, peakMonthly: 250, efficiency: 0.87 },
    }

    const locationKey =
      Object.keys(locationData).find((key) => formData.location.toLowerCase().includes(key.toLowerCase())) || "default"

    const { avgRainfall, peakMonthly, efficiency } = locationData[locationKey]

    // Advanced harvestable water calculation
    const harvestableWater = Math.round(
      area * materialMultiplier * buildingMultiplier * (avgRainfall / 1000) * 1000 * efficiency,
    )

    // Sophisticated tank sizing based on multiple factors
    const dailyDemand =
      {
        residential: area * 2, // 2L per sq meter
        commercial: area * 3.5,
        industrial: area * 5,
        educational: area * 2.5,
      }[formData.buildingType] || area * 2

    const peakHarvest = Math.round(area * materialMultiplier * (peakMonthly / 1000) * 1000)
    const storageBuffer = 1.2 // 20% buffer
    const optimalTankSize = Math.round(Math.min(peakHarvest * storageBuffer, dailyDemand * 15)) // Max 15 days storage

    const waterRate = 4.5 // ₹4.5 per liter (realistic Indian rate)
    const costSavings = Math.round(harvestableWater * waterRate)
    const carbonOffset = Math.round(harvestableWater * 0.0004) // Updated carbon factor
    const systemCost = Math.round(optimalTankSize * 25 + area * 350) // Realistic Indian system cost
    const maintenanceCost = Math.round(systemCost * 0.05) // 5% annual maintenance

    const calculationResults = {
      harvestableWater,
      tankSize: optimalTankSize,
      avgRainfall,
      peakMonthly,
      costSavings,
      carbonOffset,
      systemCost,
      maintenanceCost,
      dailyDemand: Math.round(dailyDemand),
      efficiency: Math.round(efficiency * 100),
      rechargeStructure: area > 150 ? "Recharge Pit with Percolation Chamber" : "Recharge Trench with Filter Media",
      firstFlush: area > 100 ? "3mm diverter with auto-flush" : "2mm diverter recommended",
      filter: area > 200 ? "Multi-stage sand & activated carbon filter" : "Sand & gravel filter",
      pumpSystem: area > 300 ? "Submersible pump with pressure tank" : "Manual/gravity feed system",
      maintenance: "Quarterly cleaning, annual system check",
      roi: Math.round(systemCost / (costSavings || 1)), // years to break even
      waterSecurity: Math.round((harvestableWater / (dailyDemand * 365)) * 100), // % of annual demand met
      location: locationKey,
    }

    setResults(calculationResults)
    setShowResults(true)

    if (authData.isSignedIn) {
      try {
        const supabase = createClient()

        const calculationData = {
          calculation_name: `${formData.location} - ${new Date().toLocaleDateString()}`,
          roof_area: area,
          roof_material: formData.roofMaterial,
          building_type: formData.buildingType,
          location: formData.location,
          annual_rainfall: avgRainfall,
          runoff_coefficient: materialMultiplier,
          gutter_efficiency: efficiency,
          annual_harvest_potential: harvestableWater,
          cost_savings: costSavings,
          system_cost: systemCost,
          tank_size: optimalTankSize,
          environmental_impact: {
            co2_saved: carbonOffset,
            water_security_percentage: calculationResults.waterSecurity,
          },
        }

        const { data, error } = await supabase.from("calculations").insert(calculationData).select()

        if (error) {
          console.error("[v0] Error saving calculation:", error)
        } else {
          console.log("[v0] Calculation saved successfully:", data)
        }
      } catch (error) {
        console.error("[v0] Error connecting to Supabase:", error)
      }
    }

    setIsCalculating(false)
  }

  const calculateRainwaterHarvesting = () => {
    setIsCalculating(true)

    const area = Number.parseFloat(formData.roofArea) || 0
    const materialMultiplier =
      {
        concrete: 0.85,
        tiles: 0.8,
        metal: 0.9,
        others: 0.75,
      }[formData.roofMaterial] || 0.8

    const buildingMultiplier =
      {
        residential: 1.0,
        commercial: 1.2,
        industrial: 1.5,
        educational: 1.1,
      }[formData.buildingType] || 1.0

    // Enhanced location-based rainfall data with seasonal variations
    const locationData = {
      Mumbai: { avgRainfall: 2400, peakMonthly: 800, efficiency: 0.92 },
      Delhi: { avgRainfall: 800, peakMonthly: 180, efficiency: 0.88 },
      Chennai: { avgRainfall: 1200, peakMonthly: 350, efficiency: 0.9 },
      Bangalore: { avgRainfall: 900, peakMonthly: 200, efficiency: 0.89 },
      Pune: { avgRainfall: 650, peakMonthly: 150, efficiency: 0.87 },
      Hyderabad: { avgRainfall: 750, peakMonthly: 170, efficiency: 0.88 },
      Kolkata: { avgRainfall: 1600, peakMonthly: 400, efficiency: 0.91 },
      default: { avgRainfall: 1000, peakMonthly: 250, efficiency: 0.87 },
    }

    const locationKey =
      Object.keys(locationData).find((key) => formData.location.toLowerCase().includes(key.toLowerCase())) || "default"

    const { avgRainfall, peakMonthly, efficiency } = locationData[locationKey]

    // Advanced harvestable water calculation
    const harvestableWater = Math.round(
      area * materialMultiplier * buildingMultiplier * (avgRainfall / 1000) * 1000 * efficiency,
    )

    // Sophisticated tank sizing based on multiple factors
    const dailyDemand =
      {
        residential: area * 2, // 2L per sq meter
        commercial: area * 3.5,
        industrial: area * 5,
        educational: area * 2.5,
      }[formData.buildingType] || area * 2

    const peakHarvest = Math.round(area * materialMultiplier * (peakMonthly / 1000) * 1000)
    const storageBuffer = 1.2 // 20% buffer
    const optimalTankSize = Math.round(Math.min(peakHarvest * storageBuffer, dailyDemand * 15)) // Max 15 days storage

    const waterRate = 4.5 // ₹4.5 per liter (realistic Indian rate)
    const costSavings = Math.round(harvestableWater * waterRate)
    const carbonOffset = Math.round(harvestableWater * 0.0004) // Updated carbon factor
    const systemCost = Math.round(optimalTankSize * 25 + area * 350) // Realistic Indian system cost
    const maintenanceCost = Math.round(systemCost * 0.05) // 5% annual maintenance

    const dailyDemandRounded = Math.round(dailyDemand)
    const efficiencyRounded = Math.round(efficiency * 100)
    const roi = Math.round(systemCost / (costSavings || 1))
    const waterSecurity = Math.round((harvestableWater / (dailyDemand * 365)) * 100)

    const rechargeStructure = area > 150 ? "Recharge Pit with Percolation Chamber" : "Recharge Trench with Filter Media"
    const firstFlush = area > 100 ? "3mm diverter with auto-flush" : "2mm diverter recommended"
    const filter = area > 200 ? "Multi-stage sand & activated carbon filter" : "Sand & gravel filter"
    const pumpSystem = area > 300 ? "Submersible pump with pressure tank" : "Manual/gravity feed system"
    const maintenance = "Quarterly cleaning, annual system check"

    const calculationResults = {
      harvestableWater,
      tankSize: optimalTankSize,
      avgRainfall,
      peakMonthly,
      costSavings,
      carbonOffset,
      systemCost,
      maintenanceCost,
      dailyDemand: dailyDemandRounded,
      efficiency: efficiencyRounded,
      rechargeStructure,
      firstFlush,
      filter,
      pumpSystem,
      maintenance,
      roi,
      waterSecurity,
      location: formData.location,
    }

    setResults(calculationResults)
    setShowResults(true)
    setIsCalculating(false)

    // Save to database if user is signed in
    saveCalculationToDatabase(calculationResults)
  }

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const demoLocations = [
          "Mumbai, Maharashtra (19.0760, 72.8777)",
          "Delhi, India (28.6139, 77.2090)",
          "Bangalore, Karnataka (12.9716, 77.5946)",
          "Chennai, Tamil Nadu (13.0827, 80.2707)",
        ]
        const randomLocation = demoLocations[Math.floor(Math.random() * demoLocations.length)]

        setFormData((prev) => ({
          ...prev,
          location: randomLocation,
        }))
      })
    }
  }

  const handleCalculatorAccess = () => {
    if (!authData.isSignedIn) {
      setShowAuth(true)
    }
  }

  const handleDownloadReport = () => {
    if (!results || !authData.isSignedIn) return

    generatePDFReport(results, formData, {
      name: authData.name,
      phone: authData.phone,
      email: authData.email,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Droplets className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              JalSetu
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-primary transition-colors">
              Impact
            </a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">
              Process
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-2">
            {!authData.isSignedIn ? (
              <Button variant="outline" onClick={() => setShowAuth(true)} className="hidden sm:flex">
                <Phone className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="hidden sm:inline">Hi, {authData.name}!</span>
              </div>
            )}
            <Button
              className="text-white border-0"
              style={{ backgroundColor: "#2563eb" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb"
              }}
              onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
            >
              Calculate Now
            </Button>
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-lg p-6 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="relative mx-auto mb-4">
                <Phone className="h-12 w-12 text-primary mx-auto" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold">{!authData.otpSent ? "Quick Sign In Required" : "Verify OTP"}</h3>
              <p className="text-muted-foreground text-sm mt-2">
                {!authData.otpSent
                  ? "Access advanced calculations and personalized recommendations"
                  : `OTP sent to ${authData.phone}`}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3 text-xs text-green-600">
                <Shield className="h-3 w-3" />
                <span>Secure & Private</span>
              </div>
            </div>

            {!authData.otpSent ? (
              <Tabs defaultValue="phone" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                </TabsList>

                <TabsContent value="phone" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={authData.phone}
                      onChange={(e) => handleAuthChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={authData.name}
                      onChange={(e) => handleAuthChange("name", e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSendOTP} className="w-full" disabled={!authData.phone || !authData.name}>
                    <Zap className="h-4 w-4 mr-2" />
                    Send OTP
                  </Button>
                </TabsContent>

                <TabsContent value="email" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={authData.email}
                      onChange={(e) => handleAuthChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={authData.name}
                      onChange={(e) => handleAuthChange("name", e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSendOTP} className="w-full" disabled={!authData.email || !authData.name}>
                    <Mail className="h-4 w-4 mr-2" />
                    Send OTP
                  </Button>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-digit OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    value={authData.otp}
                    onChange={(e) => handleAuthChange("otp", e.target.value)}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground text-center">Demo: Use 1234 or any 6-digit code</p>
                </div>
                <Button onClick={handleVerifyOTP} className="w-full" disabled={!authData.otp}>
                  <Shield className="h-4 w-4 mr-2" />
                  Verify & Sign In
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setAuthData((prev) => ({ ...prev, otpSent: false, otp: "" }))}
                  className="w-full text-xs"
                >
                  ← Back to phone number
                </Button>
              </div>
            )}

            <div className="text-center mt-4 text-xs text-muted-foreground">
              <p>By signing in, you agree to our terms and privacy policy</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20" />
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                y: [0, -120],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.6,
              }}
              style={{
                left: `${15 + i * 12}%`,
                top: "100%",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-balance"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{
                background: "linear-gradient(90deg, #2563eb, #059669, #0891b2, #2563eb)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              JalSetu
            </motion.h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              From roof to resource, made simple
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
              Transform your rooftop into a sustainable water source. Calculate your rainwater harvesting potential with
              precision and start your journey towards water independence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="px-8 py-4 text-lg text-white border-0"
                style={{ backgroundColor: "#2563eb" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1d4ed8"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2563eb"
                }}
                onClick={() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start Estimation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>15K+ users</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advanced Rainwater Calculator</h2>
              <p className="text-lg text-muted-foreground">Professional-grade estimation with personalized insights</p>
              {authData.isSignedIn && (
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-green-600">
                  <Unlock className="h-4 w-4" />
                  <span>Premium calculations unlocked</span>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
                {!authData.isSignedIn && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access advanced calculations and personalized recommendations
                      </p>
                      <Button onClick={handleCalculatorAccess} className="bg-primary text-primary-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        Sign In to Continue
                      </Button>
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary" />
                    Input Details
                  </CardTitle>
                  <CardDescription>Provide your location and roof specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">GPS Location</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Enter coordinates or address"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="flex-1"
                        disabled={!authData.isSignedIn}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleAutoLocation}
                        className="shrink-0 bg-transparent hover:bg-primary/10"
                        disabled={!authData.isSignedIn}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roofArea">Roof Area (m²)</Label>
                    <Input
                      id="roofArea"
                      type="number"
                      placeholder="Enter roof area in square meters"
                      value={formData.roofArea}
                      onChange={(e) => handleInputChange("roofArea", e.target.value)}
                      disabled={!authData.isSignedIn}
                    />
                    {formData.roofArea && (
                      <div className="text-xs text-muted-foreground">
                        <Info className="h-3 w-3 inline mr-1" />
                        Approx. {Math.round(Number(formData.roofArea) * 10.764)} sq ft
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roofMaterial">Roof Material</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("roofMaterial", value)}
                      disabled={!authData.isSignedIn}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select roof material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concrete">Concrete (85% efficiency)</SelectItem>
                        <SelectItem value="tiles">Clay/Ceramic Tiles (80% efficiency)</SelectItem>
                        <SelectItem value="metal">Metal Sheets (90% efficiency)</SelectItem>
                        <SelectItem value="others">Others (75% efficiency)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buildingType">Building Type</Label>
                    <Select
                      onValueChange={(value) => handleInputChange("buildingType", value)}
                      disabled={!authData.isSignedIn}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Residential
                          </div>
                        </SelectItem>
                        <SelectItem value="commercial">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Commercial
                          </div>
                        </SelectItem>
                        <SelectItem value="industrial">
                          <div className="flex items-center gap-2">
                            <Factory className="h-4 w-4" />
                            Industrial
                          </div>
                        </SelectItem>
                        <SelectItem value="educational">
                          <div className="flex items-center gap-2">
                            <School className="h-4 w-4" />
                            Educational
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleCalculate}
                      className="w-full text-white border-0"
                      style={{ backgroundColor: "#2563eb" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#1d4ed8"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb"
                      }}
                      disabled={!authData.isSignedIn || !formData.roofArea || !formData.location || isCalculating}
                    >
                      {isCalculating
                        ? "Calculating..."
                        : authData.isSignedIn
                          ? "Calculate Potential"
                          : "Sign In to Calculate"}
                      <Calculator className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card className={`relative overflow-hidden ${showResults ? "border-primary/50 shadow-lg" : ""}`}>
                {showResults && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Advanced Results
                  </CardTitle>
                  <CardDescription>Comprehensive rainwater harvesting analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {showResults && results ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-800">
                          <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-blue-600">
                            {results.harvestableWater.toLocaleString()}L
                          </div>
                          <div className="text-xs text-muted-foreground">Annual Harvest</div>
                          <div className="text-xs text-blue-600 mt-1">{results.efficiency}% efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <Building className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-emerald-600">
                            {results.tankSize.toLocaleString()}L
                          </div>
                          <div className="text-xs text-muted-foreground">Optimal Tank</div>
                          <div className="text-xs text-emerald-600 mt-1">15-day storage</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-950/50 dark:to-orange-900/50 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <DollarSign className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-orange-600">
                            ₹{results.costSavings.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Annual Savings</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg border border-green-200 dark:border-green-800">
                          <TreePine className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-green-600">{results.carbonOffset}kg</div>
                          <div className="text-xs text-muted-foreground">CO₂ Offset</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg border border-purple-200 dark:border-purple-800">
                          <Shield className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-purple-600">{results.waterSecurity}%</div>
                          <div className="text-xs text-muted-foreground">Water Security</div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Daily Demand:</span>
                          <Badge variant="secondary" className="text-xs">
                            {results.dailyDemand}L/day
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">System Cost:</span>
                          <Badge variant="outline" className="text-xs">
                            ₹{results.systemCost.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Annual Maintenance:</span>
                          <Badge variant="outline" className="text-xs">
                            ₹{results.maintenanceCost.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Recharge Structure:</span>
                          <Badge variant="secondary" className="text-xs max-w-[60%] text-right">
                            {results.rechargeStructure}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">First-flush:</span>
                          <Badge variant="outline" className="text-xs max-w-[60%] text-right">
                            {results.firstFlush}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Filter System:</span>
                          <Badge variant="outline" className="text-xs max-w-[60%] text-right">
                            {results.filter}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium">Pump System:</span>
                          <Badge variant="outline" className="text-xs max-w-[60%] text-right">
                            {results.pumpSystem}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          Advanced Analytics
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Peak Monthly:</span>
                            <div className="font-medium">{results.peakMonthly}mm</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ROI Period:</span>
                            <div className="font-medium">{results.roi} years</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-sm font-medium mb-3">
                          <Users className="h-4 w-4 text-primary" />
                          Certified Engineers Near You
                        </div>
                        <div className="space-y-3">
                          {[
                            {
                              name: "Rajesh Kumar",
                              experience: "12+ years",
                              speciality: "Residential RWH Systems",
                              rating: 4.8,
                              projects: 150,
                              phone: "+91 98765 43210",
                              location: "2.5 km away",
                            },
                            {
                              name: "Priya Sharma",
                              experience: "8+ years",
                              speciality: "Commercial & Industrial",
                              rating: 4.9,
                              projects: 85,
                              phone: "+91 87654 32109",
                              location: "4.2 km away",
                            },
                            {
                              name: "Amit Patel",
                              experience: "15+ years",
                              speciality: "Ground Water Recharge",
                              rating: 4.7,
                              projects: 200,
                              phone: "+91 76543 21098",
                              location: "6.8 km away",
                            },
                          ].map((engineer, index) => (
                            <div key={index} className="bg-background/80 rounded-lg p-3 border border-border/50">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium text-sm">{engineer.name}</div>
                                  <div className="text-xs text-muted-foreground">{engineer.speciality}</div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 text-xs">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{engineer.rating}</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">{engineer.projects} projects</div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {engineer.experience}
                                  </Badge>
                                  <span className="text-muted-foreground">{engineer.location}</span>
                                </div>
                                <Button size="sm" variant="outline" className="h-6 text-xs px-2 bg-transparent">
                                  <Phone className="h-3 w-3 mr-1" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-center">
                          <Button variant="ghost" size="sm" className="text-xs">
                            View All Engineers →
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent text-xs"
                          onClick={handleDownloadReport}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent text-xs">
                          <FileText className="mr-2 h-4 w-4" />
                          Save Project
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Sign in and enter details to see advanced results</p>
                      <p className="text-xs mt-2">Professional-grade calculations with personalized insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan and implement your rainwater harvesting system
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Offline-first functionality",
                description: "Works seamlessly even without internet connectivity",
                color: "text-blue-500",
                bgColor: "bg-blue-50 dark:bg-blue-950/20",
              },
              {
                icon: FileText,
                title: "Auto-generated PDF reports",
                description: "Detailed reports with photos and specifications",
                color: "text-emerald-500",
                bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
              },
              {
                icon: Eye,
                title: "GIS + AR integration",
                description: "Advanced roof capture technology (coming soon)",
                color: "text-purple-500",
                bgColor: "bg-purple-50 dark:bg-purple-950/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Benefits Section */}
      <section id="impact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Impact & Benefits</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the transformative power of rainwater harvesting
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Social",
                description: "Community water security and reduced dependency on external sources",
                color: "text-blue-500",
                bgColor: "bg-blue-50 dark:bg-blue-950/20",
              },
              {
                icon: DollarSign,
                title: "Economic",
                description: "Significant savings on water bills and increased property value",
                color: "text-emerald-500",
                bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
              },
              {
                icon: Leaf,
                title: "Environmental",
                description: "Reduced groundwater depletion and urban flooding mitigation",
                color: "text-green-500",
                bgColor: "bg-green-50 dark:bg-green-950/20",
              },
              {
                icon: Shield,
                title: "Policy",
                description: "Compliance with green building norms and government incentives",
                color: "text-purple-500",
                bgColor: "bg-purple-50 dark:bg-purple-950/20",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Real-world Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-950/20 dark:to-emerald-950/20 border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Building className="h-16 w-16 text-primary" />
                    <Waves className="h-8 w-8 text-blue-400 absolute -bottom-2 -right-2" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Real-world Impact</h3>
                <p className="text-lg text-muted-foreground mb-4">A 200 m² roof in Delhi can harvest approximately</p>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  8,000 liters
                </div>
                <p className="text-muted-foreground mb-4">from just one 50mm rainfall event</p>
                <div className="flex justify-center gap-8 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-green-600">₹160</div>
                    <div className="text-muted-foreground">Saved per event</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">2.4kg</div>
                    <div className="text-muted-foreground">CO₂ offset</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tech & Process Section */}
      <section id="process" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes rainwater harvesting planning simple and accurate
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-5 gap-4 items-center">
              {[
                { icon: MapPin, title: "GPS Location", desc: "Detect location", color: "text-blue-500" },
                { icon: Building, title: "Roof Capture", desc: "Measure area", color: "text-emerald-500" },
                { icon: Cloud, title: "Rainfall Data", desc: "Fetch climate data", color: "text-cyan-500" },
                { icon: Calculator, title: "Computation", desc: "Calculate potential", color: "text-purple-500" },
                { icon: FileText, title: "Report", desc: "Generate output", color: "text-orange-500" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-muted/50 to-muted rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center hover:shadow-lg transition-shadow">
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                  {index < 4 && <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto mt-4 hidden md:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about rainwater harvesting? We're here to help.
            </p>

            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Team Code Catalysts</h3>
                  </div>
                  <p className="text-muted-foreground">Innovating sustainable water solutions</p>
                </div>

                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      placeholder="Tell us about your rainwater harvesting project..."
                    />
                  </div>
                  <Button
                    className="w-full text-white border-0"
                    style={{ backgroundColor: "#2563eb" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1d4ed8"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#2563eb"
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                JalSetu
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 Code Catalysts</span>
              <span>•</span>
              <span>From roof to resource, made simple</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 h-96 bg-background border border-border rounded-lg shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-medium">JalSetu Assistant</span>
              {chatLanguage && (
                <Badge variant="secondary" className="text-xs">
                  {chatLanguage === "hindi" ? "हिंदी" : "English"}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {!chatInitialized ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center space-y-4">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-medium mb-2">Choose Language</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => initializeChat("english")}
                      className="bg-primary text-primary-foreground"
                    >
                      English
                    </Button>
                    <Button size="sm" onClick={() => initializeChat("hindi")} variant="outline">
                      हिंदी
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder={chatLanguage === "hindi" ? "अपना प्रश्न लिखें..." : "Type your question..."}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSendMessage} disabled={!currentMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
