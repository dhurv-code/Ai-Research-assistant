from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth_schema import SignupRequest, LoginRequest, TokenResponse, ForgotPasswordRequest, ResetPasswordRequest, UserOut
from app.services.auth_service import AuthService
from app.services.email_service import EmailService

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/signup", response_model=TokenResponse)
async def signup(data: SignupRequest):
    user = await AuthService.create_user(data.name, data.email, data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")
    token = AuthService.create_token_for_user(user)
    return {"access_token": token}


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest):
    user = await AuthService.authenticate_user(data.email, data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = AuthService.create_token_for_user(user)
    return {"access_token": token}


@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest):
    token = await AuthService.generate_reset_token(data.email)
    if not token:
        # don't reveal whether email exists
        return {"status": "ok"}
    try:
        EmailService.send_reset_email(data.email, token)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"status": "sent"}


@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest):
    ok = await AuthService.reset_password(data.token, data.new_password)
    if not ok:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token")
    return {"status": "password_reset"}
