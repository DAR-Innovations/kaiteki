from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import StreamingResponse

from schemas import prompt_schema
from services import (chatbot_service, openai_service, paraphrase_service,
                      text_service)

kaizen_v1_router = APIRouter(prefix="/kaizen/v1", tags=["Kaizen API"])

@kaizen_v1_router.post(
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


@kaizen_v1_router.post(
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


@kaizen_v1_router.post(
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


@kaizen_v1_router.post(
    "/paraphrase",
    response_model=prompt_schema.Response,
    summary="Paraphrase text"
)
def paraphrase_text(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty text")
    
    result = paraphrase_service.paraphrase_text(prompt)
    return prompt_schema.Response(result=result)


@kaizen_v1_router.post(
    "/chatbot/openai",
    response_model=prompt_schema.Response,
    summary="Prompt a chatbot"
)
def prompt_chatbot_openai(req: prompt_schema.Request):
    prompt = req.prompt

    if not prompt:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt is empty")
    
    result = openai_service.generate_prompt(prompt)

    return prompt_schema.Response(result=result)

