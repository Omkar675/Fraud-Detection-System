import { useState } from 'react'

const TRANSACTION_TYPES = [
  { id: 'credit_card', name: 'Credit Card', icon: '💳' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
  { id: 'upi', name: 'UPI Payment', icon: '📱' },
  { id: 'bitcoin', name: 'Bitcoin', icon: '₿' }
]

function TransactionForm({ onPredict, loading }) {
  const [selectedType, setSelectedType] = useState('credit_card')
  const [amount, setAmount] = useState('')
  const [jsonFeatures, setJsonFeatures] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Build transaction data
    let transactionData = {
      amount: parseFloat(amount) || 0
    }

    // Parse additional features if provided
    if (jsonFeatures.trim()) {
      try {
        const additionalFeatures = JSON.parse(jsonFeatures)
        transactionData = { ...transactionData, ...additionalFeatures }
      } catch (error) {
        alert('Invalid JSON format in features field')
        return
      }
    }

    // Call parent handler
    onPredict(transactionData, selectedType)
  }

  return (
    <div className="transaction-form-container">
      <h2>Select Transaction Type</h2>
      
      <div className="type-selector">
        {TRANSACTION_TYPES.map(type => (
          <div
            key={type.id}
            className={`type-card ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="type-icon">{type.icon}</div>
            <div className="type-name">{type.name}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="amount">Transaction Amount *</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount (e.g., 100.00)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="features">Additional Features (JSON format)</label>
          <textarea
            id="features"
            rows="6"
            value={jsonFeatures}
            onChange={(e) => setJsonFeatures(e.target.value)}
            placeholder='{"feature1": value1, "feature2": value2}'
          />
          <small>Optional: Add more transaction features in JSON format</small>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Transaction'}
        </button>
      </form>
    </div>
  )
}

export default TransactionForm