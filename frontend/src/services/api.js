import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

const token = localStorage.getItem(
  "authToken"
)

if(token){

  api.defaults.headers.common[
    "Authorization"
  ]=`Bearer ${token}`

}

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      console.log(
        "401 received from:",
        error.config?.url
      )

      console.log(
        "Response:",
        error.response?.data
      )

    }

    return Promise.reject(error)

  }

)

export async function wakeBackend() {
  try {
    await api.get("/")
    console.log("Backend wake request sent")
  } catch (error) {
    console.log("Backend waking...", error)
  }
}

const fallbackPapers = [
  {
    id: 'paper-001',
    title: 'Emergent Patterns in Transformer Research Workflows',
    topic: 'Machine Learning',
    summary: 'A broad study of how transformer-based methods are shaping modern AI research workflows with an emphasis on reproducibility and automation.',
    abstract: 'This paper examines large-scale transformer models applied to scientific discovery and outlines automation patterns for research teams.',
    pdf_link: 'https://arxiv.org/pdf/2401.00001.pdf',
    source: 'arXiv',
    authors: ['A. Roberts', 'K. Zhang'],
    published: '2026-04-23',
  },
  {
    id: 'paper-002',
    title: 'Topic-aware Retrieval Augmented Generation for Literature Review',
    topic: 'NLP',
    summary: 'Proposes a research assistant architecture that blends topic discovery with RAG-based question answering for academic papers.',
    abstract: 'The authors present a system that indexes papers by topic and synthesizes natural language summaries on demand.',
    pdf_link: 'https://arxiv.org/pdf/2402.00002.pdf',
    source: 'arXiv',
    authors: ['M. Patel', 'H. Liu'],
    published: '2026-03-19',
  },
  {
    id: 'paper-003',
    title: 'Automated Extraction of Research Trends from ArXiv Streams',
    topic: 'Data Science',
    summary: 'Introduces an automated pipeline for discovering trending research themes directly from arXiv metadata and abstracts.',
    abstract: 'The system analyzes paper metadata and applies semantic clustering to surface emerging themes in real time.',
    pdf_link: 'https://arxiv.org/pdf/2403.00003.pdf',
    source: 'arXiv',
    authors: ['L. Gomes'],
    published: '2026-02-11',
  },
]

const fallbackHistory = [
  {
    id: 'history-001',
    title: 'Review of research automation strategies',
    type: 'Summary created',
    timestamp: '2026-05-15T14:22:00Z',
    note: 'Generated a concise overview of emerging AI research automation patterns.',
  },
  {
    id: 'history-002',
    title: 'Paper discovery session',
    type: 'Discovery run',
    timestamp: '2026-05-13T09:47:00Z',
    note: 'Found 12 new papers matching machine learning and systems topics.',
  },
]

const fallbackTopics = [
  'Machine Learning',
  'NLP',
  'Computer Vision',
  'Research Automation',
  'Knowledge Graphs',
  'Causal Inference',
]

const fallbackActivity = [
  {
    id: 'activity-001',
    title: 'Discovered 8 new papers for Deep Learning',
    time: 'Just now',
  },
  {
    id: 'activity-002',
    title: 'Summarized 5 papers from arXiv in 2 minutes',
    time: '1 hour ago',
  },
  {
    id: 'activity-003',
    title: 'Uploaded a new PDF and indexed passages',
    time: 'Yesterday',
  },
]

export async function fetchDiscoverPapers() {
  try {
    const { data } = await api.get('/discover')
    if (Array.isArray(data)) {
      return data
    }

    if (data?.papers && Array.isArray(data.papers)) {
      return data.papers
    }

    return fallbackPapers
  } catch (error) {
    return fallbackPapers
  }
}

export async function fetchPapers() {
  try {
    const { data } = await api.get('/papers')
    if (Array.isArray(data) && data.length > 0) {
      return data.map((paper) => ({
        ...paper,
        id: paper.id || paper._id || paper.filename || '',
        title: paper.title || paper.filename || 'Untitled paper',
      }))
    }
    return fallbackPapers
  } catch (error) {
    return fallbackPapers
  }
}

export async function fetchPaperById(id) {
  const papers = await fetchPapers()
  return (
    papers.find((paper) => paper.id?.toString() === id || paper.slug === id) ||
    papers[Number(id)] ||
    papers[0]
  )
}

export async function fetchTopics() {
  try {
    const { data } = await api.get('/topics')
    return data || fallbackTopics
  } catch (error) {
    return fallbackTopics
  }
}

export async function saveTopics(topics) {
  try {
    const { data } = await api.post('/topics', { topics })
    return data
  } catch (error) {
    return { success: true, topics }
  }
}

export async function uploadPaper(file, onUploadProgress) {
  try {
    const form = new FormData()
    form.append('file', file)
    const { data } = await api.post('/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    })
    return data
  } catch (error) {
    return { error: error.message }
  }
}

// export async function sendChatMessage({ question, paperId, paper_id, sessionId, session_id }) {
//   const payload = {
//     question,
//     paper_id: paper_id || paperId,
//     session_id: session_id || sessionId || `${Date.now()}`,
//   }

//   try {
//     const { data } = await api.post('/chat', payload)
//     return data
//   } catch (error) {
//     return { reply: 'Unable to reach the assistant right now. Please try again later.' }
//   }
// }

export async function sendChatMessage({
  question,
  paperId,
  paper_id,
  sessionId,
  session_id
}) {

  const payload = {

    question,

    paper_id:
      paper_id || paperId,

    session_id:
      session_id ||
      sessionId ||
      `${Date.now()}`
  }

  try {

    console.log(
      "Sending payload:",
      payload
    )

    const { data } =
      await api.post(
        '/chat',
        payload
      )

    console.log(
      "Chat success:",
      data
    )

    return data

  }

  catch(error){

 console.log("FULL:", error)

 console.log(
   "MESSAGE:",
   error.message
 )

 console.log(
   "REQUEST:",
   error.request
 )

 console.log(
   "RESPONSE:",
   error.response
 )

 return {

   reply:
   `ERROR:
   ${error.message}`

 }

}

}


export async function fetchHistory() {
  try {
    const { data } = await api.get('/history')
    return data || fallbackHistory
  } catch (error) {
    return fallbackHistory
  }
}

export async function fetchDashboardStats() {
  try {
    const { data } = await api.get('/discover/stats')
    return data
  } catch (error) {
    return {
      papers: 146,
      summaries: 89,
      uploads: 32,
      questions: 214,
      discoverySpeed: '2 min',
    }
  }
}

export async function fetchActivityFeed() {
  try {
    const { data } = await api.get('/activity')
    return data || fallbackActivity
  } catch {
    return fallbackActivity
  }
}

export async function fetchTrendingTopics() {
  try {
    const { data } = await api.get('/topics/trending')
    return data || fallbackTopics
  } catch {
    return fallbackTopics
  }
}

export default api