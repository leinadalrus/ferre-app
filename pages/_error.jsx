export default function Error ({ statusCode }) {
  return (
    (<h1>500 - Serverside Error Occurred!</h1>),
    (
      <p>
        {statusCode
          ? `An error occurred: ${statusCode}`
          : `An error occurred in the browser client-side`}
      </p>
    )
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
