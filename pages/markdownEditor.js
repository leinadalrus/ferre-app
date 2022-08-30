function MarkdownEditor ({ documents }) {
  return (
    <body>
      {documents.map(controller => (
        <div>{controller.action.id}</div>
      ))}
    </body>
  )
}

/* export async function getStaticProps () {
  const response = await fetch('https://.../documents')
  const request = await response.json()

  return {
    props: {
      documents
    }
  }
} */

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

export async function getStaticProps({ params }) {
  const response = await fetch(`https://.../documents/${params.id}`)
  const request = await response.json()

  return { props: { document }}
}

export default MarkdownEditor
