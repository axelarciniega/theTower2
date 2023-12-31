


export class TowerEvent{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.ticketCount = data.ticketCount
        this.creator = data.creator
        this.startTime = new Date(data.startTime)
        this.ticketCount = data.ticketCount
    }
}