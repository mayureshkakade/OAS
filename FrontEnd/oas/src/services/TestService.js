export default function TestService(url,type)
{
    fetch("://localhost:6076/api/users")
    .then(response => response.json());
}