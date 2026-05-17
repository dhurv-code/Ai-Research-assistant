from apscheduler.schedulers.asyncio import (
    AsyncIOScheduler
)

from app.automation.paper_monitor import (
    PaperMonitor
)

scheduler=
AsyncIOScheduler()


scheduler.add_job(

    PaperMonitor.monitor,

    "interval",

    hours=6

)


scheduler.start()