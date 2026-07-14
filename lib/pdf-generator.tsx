export interface ReportData {
  harvestableWater: number
  tankSize: number
  avgRainfall: number
  peakMonthly: number
  costSavings: number
  carbonOffset: number
  systemCost: number
  maintenanceCost: number
  dailyDemand: number
  efficiency: number
  rechargeStructure: string
  firstFlush: string
  filter: string
  pumpSystem: string
  maintenance: string
  roi: number
  waterSecurity: number
  location: string
}

export interface FormData {
  roofArea: string
  roofMaterial: string
  buildingType: string
  location: string
  gpsCoords: string
}

export interface UserData {
  name: string
  phone: string
  email: string
}

export function generatePDFReport(results: ReportData, formData: FormData, userData: UserData): void {
  // Create a new window for the PDF content
  const printWindow = window.open("", "_blank")

  if (!printWindow) {
    alert("Please allow popups to download the report")
    return
  }

  const currentDate = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>JalSetu - Rainwater Harvesting Report</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        
        .logo {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(90deg, #2563eb, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        
        .subtitle {
          color: #666;
          font-size: 1.1rem;
        }
        
        .report-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          border-left: 4px solid #2563eb;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 1.4rem;
          color: #2563eb;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .metric-card {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        
        .metric-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 5px;
        }
        
        .metric-label {
          color: #666;
          font-size: 0.9rem;
        }
        
        .details-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        .details-table th,
        .details-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .details-table th {
          background: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        
        .details-table tr:hover {
          background: #f9fafb;
        }
        
        .cost-breakdown {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #0ea5e9;
        }
        
        .environmental-impact {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #22c55e;
        }
        
        .recommendations {
          background: #fef3c7;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #f59e0b;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          color: #666;
        }
        
        .contact-info {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }
        
        @media print {
          body {
            font-size: 12px;
          }
          
          .container {
            padding: 10px;
          }
          
          .section {
            page-break-inside: avoid;
            margin-bottom: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="logo">JalSetu</div>
          <div class="subtitle">Rainwater Harvesting Assessment Report</div>
        </div>
        
        <!-- Report Information -->
        <div class="report-info">
          <h3 style="margin-bottom: 10px;">Report Details</h3>
          <p><strong>Generated for:</strong> ${userData.name}</p>
          <p><strong>Contact:</strong> ${userData.phone} | ${userData.email}</p>
          <p><strong>Location:</strong> ${formData.location}</p>
          <p><strong>Report Date:</strong> ${currentDate}</p>
          <p><strong>Roof Area:</strong> ${formData.roofArea} m² (${Math.round(Number(formData.roofArea) * 10.764)} sq ft)</p>
          <p><strong>Building Type:</strong> ${formData.buildingType.charAt(0).toUpperCase() + formData.buildingType.slice(1)}</p>
          <p><strong>Roof Material:</strong> ${formData.roofMaterial.charAt(0).toUpperCase() + formData.roofMaterial.slice(1)}</p>
        </div>
        
        <!-- Key Metrics -->
        <div class="section">
          <h2 class="section-title">Key Metrics</h2>
          <div class="grid">
            <div class="metric-card">
              <div class="metric-value">${results.harvestableWater.toLocaleString()}L</div>
              <div class="metric-label">Annual Harvest Potential</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${results.tankSize.toLocaleString()}L</div>
              <div class="metric-label">Recommended Tank Size</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">₹${results.costSavings.toLocaleString()}</div>
              <div class="metric-label">Annual Cost Savings</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${results.waterSecurity}%</div>
              <div class="metric-label">Water Security Level</div>
            </div>
          </div>
        </div>
        
        <!-- System Specifications -->
        <div class="section">
          <h2 class="section-title">System Specifications</h2>
          <table class="details-table">
            <tr>
              <th>Component</th>
              <th>Specification</th>
            </tr>
            <tr>
              <td>Recharge Structure</td>
              <td>${results.rechargeStructure}</td>
            </tr>
            <tr>
              <td>First Flush Diverter</td>
              <td>${results.firstFlush}</td>
            </tr>
            <tr>
              <td>Filter System</td>
              <td>${results.filter}</td>
            </tr>
            <tr>
              <td>Pump System</td>
              <td>${results.pumpSystem}</td>
            </tr>
            <tr>
              <td>Maintenance Schedule</td>
              <td>${results.maintenance}</td>
            </tr>
            <tr>
              <td>System Efficiency</td>
              <td>${results.efficiency}%</td>
            </tr>
          </table>
        </div>
        
        <!-- Cost Analysis -->
        <div class="section">
          <h2 class="section-title">Cost Analysis</h2>
          <div class="cost-breakdown">
            <h3 style="margin-bottom: 15px; color: #0369a1;">Financial Overview</h3>
            <table class="details-table">
              <tr>
                <th>Cost Component</th>
                <th>Amount (₹)</th>
              </tr>
              <tr>
                <td>Initial System Cost</td>
                <td>₹${results.systemCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Annual Maintenance</td>
                <td>₹${results.maintenanceCost.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Annual Water Savings</td>
                <td>₹${results.costSavings.toLocaleString()}</td>
              </tr>
              <tr style="background: #dbeafe; font-weight: bold;">
                <td>Return on Investment (ROI)</td>
                <td>${results.roi} years</td>
              </tr>
            </table>
          </div>
        </div>
        
        <!-- Environmental Impact -->
        <div class="section">
          <h2 class="section-title">Environmental Impact</h2>
          <div class="environmental-impact">
            <h3 style="margin-bottom: 15px; color: #059669;">Sustainability Benefits</h3>
            <div class="grid">
              <div style="text-align: center;">
                <div style="font-size: 1.8rem; font-weight: bold; color: #059669; margin-bottom: 5px;">
                  ${results.carbonOffset}kg
                </div>
                <div style="color: #374151;">Annual CO₂ Offset</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.8rem; font-weight: bold; color: #059669; margin-bottom: 5px;">
                  ${Math.round(results.harvestableWater * 0.8).toLocaleString()}L
                </div>
                <div style="color: #374141;">Groundwater Recharge</div>
              </div>
            </div>
            <p style="margin-top: 15px; color: #374151;">
              This system will significantly reduce your dependence on municipal water supply and contribute to groundwater conservation in your area.
            </p>
          </div>
        </div>
        
        <!-- Rainfall Data -->
        <div class="section">
          <h2 class="section-title">Climate Data</h2>
          <table class="details-table">
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Average Annual Rainfall</td>
              <td>${results.avgRainfall}mm</td>
            </tr>
            <tr>
              <td>Peak Monthly Rainfall</td>
              <td>${results.peakMonthly}mm</td>
            </tr>
            <tr>
              <td>Daily Water Demand</td>
              <td>${results.dailyDemand}L/day</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>${results.location}</td>
            </tr>
          </table>
        </div>
        
        <!-- Recommendations -->
        <div class="section">
          <h2 class="section-title">Recommendations</h2>
          <div class="recommendations">
            <h3 style="margin-bottom: 15px; color: #92400e;">Implementation Guidelines</h3>
            <ul style="margin-left: 20px; color: #374151;">
              <li style="margin-bottom: 8px;">Install the recommended ${results.tankSize.toLocaleString()}L capacity storage tank for optimal water security</li>
              <li style="margin-bottom: 8px;">Implement ${results.rechargeStructure.toLowerCase()} for groundwater recharge</li>
              <li style="margin-bottom: 8px;">Use ${results.firstFlush.toLowerCase()} to ensure water quality</li>
              <li style="margin-bottom: 8px;">Install ${results.filter.toLowerCase()} for potable water use</li>
              <li style="margin-bottom: 8px;">Follow ${results.maintenance.toLowerCase()} schedule for optimal performance</li>
              <li style="margin-bottom: 8px;">Consider ${results.pumpSystem.toLowerCase()} based on your building height and usage patterns</li>
            </ul>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div class="contact-info">
          <h3 style="margin-bottom: 10px;">Need Professional Help?</h3>
          <p>Connect with certified rainwater harvesting engineers in your area through the JalSetu platform.</p>
          <p style="margin-top: 10px;"><strong>Visit:</strong> JalSetu.com | <strong>Support:</strong> support@jalsetu.com</p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p><strong>JalSetu</strong> - From roof to resource, made simple</p>
          <p style="margin-top: 5px;">© 2024 Code Catalysts. This report is generated based on standard calculations and local climate data.</p>
          <p style="margin-top: 5px; font-size: 0.9rem;">For implementation, please consult with certified professionals.</p>
        </div>
      </div>
      
      <script>
        // Auto-print when page loads
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 500);
        }
        
        // Close window after printing
        window.onafterprint = function() {
          window.close();
        }
      </script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
