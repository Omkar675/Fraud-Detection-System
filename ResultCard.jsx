function ResultCard({ result }) {
  const isFraud = result.prediction === 'FRAUD'

  return (
    <div className={`result-card ${isFraud ? 'fraud' : 'legitimate'}`}>
      <div className="result-header">
        <h2 className={`result-title ${isFraud ? 'fraud' : 'legitimate'}`}>
          {isFraud ? '⚠️ FRAUD DETECTED' : '✅ LEGITIMATE TRANSACTION'}
        </h2>
      </div>

      <div className="result-details">
        <div className="detail-item">
          <div className="detail-label">Transaction Type</div>
          <div className="detail-value">
            {result.transaction_type.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Fraud Probability</div>
          <div className="detail-value highlight">
            {result.fraud_probability}%
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Risk Level</div>
          <div className={`detail-value risk-${result.risk_level.toLowerCase()}`}>
            {result.risk_level}
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-label">Model Accuracy</div>
          <div className="detail-value">
            {result.model_accuracy}%
          </div>
        </div>
      </div>

      <div className="probability-bar">
        <div className="bar-label">Fraud Probability Scale</div>
        <div className="bar-container">
          <div 
            className="bar-fill"
            style={{ 
              width: `${result.fraud_probability}%`,
              backgroundColor: isFraud ? '#ef5350' : '#66bb6a'
            }}
          />
        </div>
        <div className="bar-labels">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )
}

export default ResultCard