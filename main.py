"""
FastAPI Backend for Universal Fraud Detection System
Simple and efficient API with all endpoints
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
from pipeline import UniversalFraudDetectionPipeline
import traceback

# Initialize FastAPI
app = FastAPI(
    title="Universal Fraud Detection API",
    description="AI-powered fraud detection across 4 transaction types",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize pipeline globally
pipeline = UniversalFraudDetectionPipeline(model_dir='models/')

# Load models on startup
@app.on_event("startup")
async def startup_event():
    """Load all models when server starts"""
    success = pipeline.load_all_models()
    if not success:
        print("⚠️ Warning: Some models failed to load")


# Pydantic models for request/response
class TransactionRequest(BaseModel):
    transaction_data: Dict[str, Any]
    transaction_type: Optional[str] = None


class PredictionResponse(BaseModel):
    success: bool
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


# API Endpoints
@app.get("/")
async def root():
    """API information"""
    return {
        "message": "Universal Fraud Detection API",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "/": "API info",
            "/health": "Health check",
            "/models": "Loaded models info",
            "/transaction-types": "Supported types",
            "/predict": "Fraud prediction (POST)",
            "/docs": "API documentation"
        }
    }


@app.get("/health")
async def health_check():
    """Check if API and models are healthy"""
    try:
        info = pipeline.get_system_info()
        return {
            "status": "healthy",
            "models_loaded": info['loaded'],
            "available_models": info['available_models'],
            "total_models": info['total_models']
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unhealthy: {str(e)}")


@app.get("/models")
async def get_models():
    """Get information about loaded models"""
    try:
        info = pipeline.get_system_info()
        
        model_details = {}
        for model_type in info['available_models']:
            summary = pipeline.summaries[model_type]
            model_details[model_type] = {
                "name": model_type.replace('_', ' ').title(),
                "accuracy": round(summary['best_roc_auc'] * 100, 2),
                "samples_trained": summary.get('total_samples', 'N/A')
            }
        
        return {
            "success": True,
            "total_models": info['total_models'],
            "models": model_details
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/transaction-types")
async def get_transaction_types():
    """Get supported transaction types"""
    return {
        "success": True,
        "transaction_types": [
            {
                "id": "credit_card",
                "name": "Credit Card",
                "description": "Credit card transaction fraud detection",
                "icon": "💳"
            },
            {
                "id": "bank_transfer",
                "name": "Bank Transfer",
                "description": "Bank transfer and cash-out fraud detection",
                "icon": "🏦"
            },
            {
                "id": "upi",
                "name": "UPI Payment",
                "description": "UPI mobile payment fraud detection",
                "icon": "📱"
            },
            {
                "id": "bitcoin",
                "name": "Bitcoin",
                "description": "Bitcoin cryptocurrency fraud detection",
                "icon": "₿"
            }
        ]
    }


@app.post("/predict", response_model=PredictionResponse)
async def predict_fraud(request: TransactionRequest):
    """
    Predict fraud for a transaction
    
    Example request:
    {
        "transaction_data": {
            "amount": 100.0,
            "feature1": value1,
            ...
        },
        "transaction_type": "credit_card"  // optional
    }
    """
    try:
        # Validate input
        if not request.transaction_data:
            raise HTTPException(status_code=400, detail="transaction_data is required")
        
        # Make prediction
        result = pipeline.predict(
            request.transaction_data,
            request.transaction_type
        )
        
        return PredictionResponse(
            success=True,
            result=result
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        # Log the full error for debugging
        print(f"Error in prediction: {str(e)}")
        print(traceback.format_exc())
        
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@app.post("/predict/batch")
async def predict_batch(transactions: list[TransactionRequest]):
    """
    Predict fraud for multiple transactions
    
    Example request:
    [
        {
            "transaction_data": {...},
            "transaction_type": "credit_card"
        },
        ...
    ]
    """
    try:
        results = []
        
        for i, txn in enumerate(transactions):
            try:
                result = pipeline.predict(
                    txn.transaction_data,
                    txn.transaction_type
                )
                results.append({
                    "index": i,
                    "success": True,
                    "result": result
                })
            except Exception as e:
                results.append({
                    "index": i,
                    "success": False,
                    "error": str(e)
                })
        
        # Calculate summary
        successful = sum(1 for r in results if r.get('success'))
        fraud_count = sum(1 for r in results 
                         if r.get('success') and r['result']['prediction'] == 'FRAUD')
        
        return {
            "success": True,
            "summary": {
                "total": len(results),
                "successful": successful,
                "failed": len(results) - successful,
                "fraud_detected": fraud_count
            },
            "results": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Run with: uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    print("\n" + "=" * 80)
    print("Starting Universal Fraud Detection API Server")
    print("=" * 80)
    print("\nServer will run on: http://localhost:8000")
    print("API docs available at: http://localhost:8000/docs")
    print("\n" + "=" * 80 + "\n")
    
    uvicorn.run(app, host="0.0.0.0", port=8000)