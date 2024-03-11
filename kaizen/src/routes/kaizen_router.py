from fastapi import APIRouter, HTTPException, status
from services import chatbot_service, text_service
from schemas import prompt_schema

kaizen_v1_router = APIRouter(prefix="/kaizen/v1")

@kaizen_v1_router.get(
    "/summarize",
    response_model=prompt_schema.Response,
    summary="Summarize text"
)
def summarize_text(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")
 
    result = text_service.summarize_text(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.get(
    "/keywords",
    response_model=prompt_schema.Response,
    summary="Extract keywords"
)
def extract_keywords(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")
 
    result = text_service.extract_keywords(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.get(
    "/chatbot",
    response_model=prompt_schema.Response,
    summary="Prompt a chatbot"
)
def prompt_chatbot(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")
 
    result = chatbot_service.generate_response(prompt)
    return prompt_schema.Response(result=result)