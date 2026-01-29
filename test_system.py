"""
Quick test script to verify everything works
"""
from pipeline import UniversalFraudDetectionPipeline

print("Testing Universal Fraud Detection System...")
print("=" * 80)

# Initialize and load
pipeline = UniversalFraudDetectionPipeline()
success = pipeline.load_all_models()

if not success:
    print("❌ Failed to load models!")
    exit(1)

print("\n✅ All models loaded successfully!")

# Test each transaction type
test_cases = [
    {
        'name': 'Credit Card',
        'data': {'amount': 100.0, 'V1': -1.0},
        'type': 'credit_card'
    },
    {
        'name': 'Bank Transfer',
        'data': {'amount': 500.0, 'type': 'TRANSFER'},
        'type': 'bank_transfer'
    },
    {
        'name': 'UPI',
        'data': {'amount': 250.0},
        'type': 'upi'
    },
    {
        'name': 'Bitcoin',
        'data': {'amount': 1000.0},
        'type': 'bitcoin'
    }
]

print("\n" + "=" * 80)
print("Testing Predictions...")
print("=" * 80)

for test in test_cases:
    try:
        result = pipeline.predict(test['data'], test['type'])
        print(f"\n✅ {test['name']}: {result['prediction']} ({result['fraud_probability']}%)")
    except Exception as e:
        print(f"\n❌ {test['name']} failed: {str(e)}")

print("\n" + "=" * 80)
print("✅ System test complete!")
print("=" * 80)