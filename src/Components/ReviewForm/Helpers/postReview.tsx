export async function postReview(review: string) {
  return await fetch("http://127.0.0.1:4321/submitReview", {
    method: "POST",
    body: JSON.stringify({ review }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
