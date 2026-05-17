import asyncio

from app.automation.paper_monitor import (
    PaperMonitor
)

asyncio.run(
    PaperMonitor.monitor()
)