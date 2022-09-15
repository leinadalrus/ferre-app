function MarkdownEditor ({ documents }) {
  return documents.map(controller => controller.action.id)
}

export async function getStaticPaths () {
  const response = await fetch('https://.../documents')
  const documents = await response.json()

  const paths = documents.map(document => {
    params: {
      id: document.id
    }
  })

  return { paths, fallback: false }
}

export async function getStaticProps ({ params }) {
  const response = await fetch(`https://.../documents/${params.id}`)
  const request = await response.json()

  return { props: { document } }
}

export async function getServerSideProps () {
  const response = await fetch(`https://.../documents/data`)
  const data = await response.json()

  return { props: { data } }
}

export default MarkdownEditor
