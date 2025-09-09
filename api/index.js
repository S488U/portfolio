export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Working"
        });
    }

    return res.status(405).json({
        status: 405,
        success: false,
        error: {
            message: "Method not allowed"
        }
    })
}