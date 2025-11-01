export default function Dashboard(){
    return(
     <section className="w-full py-10 px-2 flex flex-col  justify-center">
          <h1 className="text-3xl w-full px-2">Dashboard</h1>
          <form className="flex flex-col items-center">
              <input placeholder="Enter user email to search" className="p-1 w-100 text-center border"/>
          </form>
          
     </section>
    )
}