import React from 'react'

/* loading indicator */
const Loader = (props: { isPending: boolean }) => {
  const { isPending } = props
  if (!isPending) {
    return null
  } else {
    return (
      <div className="loader">
        <div></div>
      </div>
    )
  }
}

export default Loader
