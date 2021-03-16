module.exports = mongoose => {
    const BookModel = mongoose.model(
      "books",
      mongoose.Schema(
        {
          author: String,
          title: String,
          isbn: String,
          releaseDate: Date
        },
        { timestamps: true }
      )
    );
    
    return BookModel;
  };