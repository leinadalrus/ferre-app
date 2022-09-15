export default function Custom500Page ({ statusCode }) {
  return (
    (<h1>An Error Occurred!</h1>),
    (
      <p>
        {statusCode
          ? `An error occurred: ${statusCode}`
          : `An error occurred in the browser client-side`}
      </p>
    )
  )
}
